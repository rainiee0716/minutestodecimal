# Time Math for Developers: Converting HH:MM to Decimal Payroll Hours

If you build scheduling, invoicing, payroll, or timesheet software, you eventually meet the same awkward boundary:

```text
Humans think in clock times.
Payroll systems think in decimal durations.
```

A shift like `09:00–17:30` is easy to read, but payroll does not want `8:30`. It usually wants:

```text
8.50 decimal hours
```

That difference looks small. It is not. It is the difference between a correct paycheck and a quietly wrong one.

In this article, we’ll build the time math step by step in JavaScript, then handle the edge cases that break real timesheet apps:

- Clock time vs duration
- Converting `HH:MM` to minutes
- Overnight shifts
- Unpaid lunch breaks
- Decimal hours
- Overtime splitting
- Floating-point rounding
- UI and validation details

---

## 1. Clock time is not duration

Before writing code, separate two concepts.

A **clock time** answers:

```text
When did this happen?
```

Examples:

```text
09:00
17:30
22:00
```

A **duration** answers:

```text
How long did it last?
```

Examples:

```text
8 hours
8.5 hours
8.25 hours
```

A timesheet UI usually collects clock times, but payroll calculations need durations.

So the pipeline is:

```text
clock in + clock out
        ↓
shift duration
        ↓
decimal hours
        ↓
weekly total
        ↓
regular + overtime
```

Keep those stages separate. Mixing them is where most bugs start.

---

## 2. Convert HH:MM to minutes since midnight

A reliable first step is to convert a time string into minutes since midnight.

```js
function toMinutes(time) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);

  if (!match) {
    throw new Error(`Invalid time: ${time}`);
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours < 0 || hours > 23) {
    throw new Error(`Hour must be between 0 and 23: ${time}`);
  }

  if (minutes < 0 || minutes > 59) {
    throw new Error(`Minute must be between 0 and 59: ${time}`);
  }

  return hours * 60 + minutes;
}
```

Examples:

```js
toMinutes("00:00"); // 0
toMinutes("09:00"); // 540
toMinutes("17:30"); // 1050
toMinutes("22:00"); // 1320
```

Why minutes?

Because minute-level integers are easier to reason about than fractional days, JavaScript `Date` objects, or timezone-aware timestamps.

For a simple timesheet calculator, minutes are usually enough.

---

## 3. Calculate a normal shift duration

The basic duration formula is:

```text
end minutes - start minutes
```

```js
function durationMinutes(start, end) {
  const startM = toMinutes(start);
  const endM = toMinutes(end);

  return endM - startM;
}
```

Example:

```js
durationMinutes("09:00", "17:30");
// 510
```

`510` minutes is:

```text
510 ÷ 60 = 8.5 hours
```

So payroll wants:

```text
8.50
```

Not:

```text
8:30
```

---

## 4. Handle shifts that cross midnight

The basic formula breaks for overnight shifts.

Example:

```text
22:00 → 06:00
```

In minutes since midnight:

```text
06:00 = 360
22:00 = 1320
```

So:

```text
360 - 1320 = -960
```

A negative shift is usually wrong.

If the end time is earlier than the start time, assume the shift crossed midnight and add one day:

```js
function durationMinutes(start, end) {
  const startM = toMinutes(start);
  const endM = toMinutes(end);

  let minutes = endM - startM;

  if (minutes < 0) {
    minutes += 24 * 60;
  }

  return minutes;
}
```

Now:

```js
durationMinutes("22:00", "06:00");
// 480
```

`480` minutes is `8.00` decimal hours.

### When not to do this

Do not blindly add 24 hours if your app allows multi-day shifts or if an end time can be empty.

For a normal daily timesheet, this rule is usually correct:

```text
If end < start, the shift crossed midnight.
```

But if you need shifts longer than 24 hours, store actual dates or timestamps instead of bare `HH:MM` strings.

---

## 5. Subtract unpaid lunch

Payroll often excludes unpaid lunch breaks.

If lunch is stored in minutes:

```js
function workMinutes(start, end, unpaidLunchMinutes = 0) {
  const minutes = durationMinutes(start, end);

  return Math.max(0, minutes - unpaidLunchMinutes);
}
```

Example:

```js
workMinutes("09:00", "17:30", 30);
// 480
```

That is:

```text
480 ÷ 60 = 8.00 decimal hours
```

If the user enters `60` minutes of lunch:

```js
workMinutes("09:00", "17:30", 60);
// 450
```

That is:

```text
450 ÷ 60 = 7.50 decimal hours
```

### Paid vs unpaid breaks

Only subtract unpaid breaks.

If a break is paid, it counts as work time and should stay inside the duration.

---

## 6. Convert minutes to decimal hours

This part is simple:

```js
function toDecimalHours(minutes) {
  return minutes / 60;
}
```

Examples:

```js
toDecimalHours(15);  // 0.25
toDecimalHours(30);  // 0.5
toDecimalHours(45);  // 0.75
toDecimalHours(480); // 8
```

For display, you usually want two decimal places:

```js
function formatHours(hours) {
  return hours.toFixed(2);
}
```

Examples:

```js
formatHours(toDecimalHours(45));
// "0.75"

formatHours(toDecimalHours(500));
// "8.33"
```

Important: format only for display.

Keep the raw number for calculations.

---

## 7. Put it together

Here is a compact function that calculates one shift:

```js
function calculateShift(start, end, unpaidLunchMinutes = 0) {
  const minutes = workMinutes(start, end, unpaidLunchMinutes);
  const hours = toDecimalHours(minutes);

  return {
    minutes,
    hours,
    display: formatHours(hours),
  };
}
```

Example:

```js
calculateShift("09:00", "17:30", 30);
```

Result:

```js
{
  minutes: 480,
  hours: 8,
  display: "8.00"
}
```

Overnight example:

```js
calculateShift("22:00", "06:00", 30);
```

Result:

```js
{
  minutes: 450,
  hours: 7.5,
  display: "7.50"
}
```

---

## 8. Calculate weekly totals

Store each day as decimal hours, then sum them.

```js
const days = [
  { start: "09:00", end: "17:30", lunch: 30 },
  { start: "08:30", end: "17:00", lunch: 30 },
  { start: "09:15", end: "17:45", lunch: 30 },
  { start: "08:00", end: "16:30", lunch: 30 },
  { start: "09:00", end: "15:45", lunch: 30 },
];

const weeklyHours = days.reduce((total, day) => {
  return total + calculateShift(day.start, day.end, day.lunch).hours;
}, 0);
```

Example result:

```text
39.50 hours
```

Do not sum formatted strings.

This is wrong:

```js
"8.00" + "8.00";
// "8.008.00"
```

Always sum numbers, then format the final result.

---

## 9. Split regular and overtime hours

A common payroll rule is:

```text
Overtime starts after 40 hours in a workweek.
```

The calculation is:

```js
function splitOvertime(weeklyHours, threshold = 40) {
  const regular = Math.min(weeklyHours, threshold);
  const overtime = Math.max(0, weeklyHours - threshold);

  return {
    regular,
    overtime,
  };
}
```

Example:

```js
splitOvertime(43.75);
```

Result:

```js
{
  regular: 40,
  overtime: 3.75
}
```

If the weekly total is below the threshold:

```js
splitOvertime(36.25);
```

Result:

```js
{
  regular: 36.25,
  overtime: 0
}
```

---

## 10. Estimate gross pay

If overtime is paid at 1.5× the regular rate:

```js
function estimatePay({ regularHours, overtimeHours, hourlyRate }) {
  const regularPay = regularHours * hourlyRate;
  const overtimePay = overtimeHours * hourlyRate * 1.5;

  return {
    regularPay,
    overtimePay,
    totalPay: regularPay + overtimePay,
  };
}
```

Example:

```js
estimatePay({
  regularHours: 40,
  overtimeHours: 3.75,
  hourlyRate: 20,
});
```

Result:

```js
{
  regularPay: 800,
  overtimePay: 112.5,
  totalPay: 912.5
}
```

For display:

```js
const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(912.5);

// "$912.50"
```

---

## 11. Watch out for floating-point math

Decimal hours can produce values like:

```text
8.333333333333334
```

That is normal floating-point behavior.

For calculations, keep the raw number.

For display, round at the edge:

```js
function formatHours(hours) {
  return hours.toFixed(2);
}
```

If you need stable arithmetic, calculate in minutes first:

```js
const minutes = 500;
const hours = minutes / 60;
```

Then format:

```js
hours.toFixed(2);
// "8.33"
```

Avoid rounding each daily value before summing if payroll expects exact totals. Round only when showing the result or when your payroll rule explicitly requires rounding.

---

## 12. Validate the input

A production UI should not assume perfect input.

At minimum, validate:

- Start time exists
- End time exists
- Start and end match `HH:MM`
- Lunch is not negative
- Lunch is not longer than the shift
- The user understands the overnight rule

Example:

```js
function validateShift(start, end, lunch) {
  if (!start) {
    return "Start time is required.";
  }

  if (!end) {
    return "End time is required.";
  }

  if (lunch < 0) {
    return "Unpaid lunch cannot be negative.";
  }

  const minutes = durationMinutes(start, end);

  if (lunch > minutes) {
    return "Unpaid lunch cannot be longer than the shift.";
  }

  return null;
}
```

Use `input type="time"` for start and end times:

```html
<label>
  Start
  <input type="time" value="09:00" />
</label>

<label>
  End
  <input type="time" value="17:30" />
</label>
```

Use `input type="number"` for lunch minutes:

```html
<label>
  Unpaid lunch
  <input type="number" min="0" step="5" value="30" />
</label>
```

This reduces typos and improves mobile UX.

---

## 13. UI details that matter

### Show the formula

Do not hide the math.

Users trust a calculator more when it explains:

```text
decimal hours = (end - start - unpaid lunch) ÷ 60
```

### Show live results

Use a live result when possible. A timesheet calculator is a small form, not a multi-step wizard.

### Keep display and calculation separate

Store numbers. Format strings.

```js
// Good
const hours = 8.5;
const display = hours.toFixed(2); // "8.50"

// Bad
const hours = "8.50";
```

### Label unpaid lunch clearly

Do not just say:

```text
Break
```

Say:

```text
Unpaid lunch
```

Otherwise users will not know whether to subtract it.

### Handle overnight shifts visibly

If end is earlier than start, show a hint:

```text
This shift crosses midnight.
```

That single sentence can prevent confusion.

---

## 14. A complete utility module

Here is a compact version you can adapt:

```js
const TIME_PATTERN = /^(\d{1,2}):(\d{2})$/;

export function toMinutes(time) {
  const match = TIME_PATTERN.exec(time);

  if (!match) {
    throw new Error(`Invalid time: ${time}`);
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours < 0 || hours > 23) {
    throw new Error(`Invalid hour in ${time}`);
  }

  if (minutes < 0 || minutes > 59) {
    throw new Error(`Invalid minute in ${time}`);
  }

  return hours * 60 + minutes;
}

export function durationMinutes(start, end) {
  let minutes = toMinutes(end) - toMinutes(start);

  if (minutes < 0) {
    minutes += 24 * 60;
  }

  return minutes;
}

export function workMinutes(start, end, unpaidLunchMinutes = 0) {
  return Math.max(0, durationMinutes(start, end) - unpaidLunchMinutes);
}

export function toDecimalHours(minutes) {
  return minutes / 60;
}

export function formatHours(hours) {
  return hours.toFixed(2);
}

export function calculateShift(start, end, unpaidLunchMinutes = 0) {
  const minutes = workMinutes(start, end, unpaidLunchMinutes);
  const hours = toDecimalHours(minutes);

  return {
    minutes,
    hours,
    display: formatHours(hours),
  };
}

export function splitOvertime(weeklyHours, threshold = 40) {
  return {
    regular: Math.min(weeklyHours, threshold),
    overtime: Math.max(0, weeklyHours - threshold),
  };
}
```

This is intentionally small. It does not handle timezones, multi-day shifts, or complex labor rules. For a basic daily timesheet, that is often the right scope.

---

## 15. Free calculator

If you want to compare your implementation against a working version, I built a free Weekly Timesheet Calculator that handles:

- Clock-in and clock-out times
- Unpaid lunch breaks
- Overnight shifts
- Weekly totals
- Regular and overtime hour splitting
- Estimated gross pay

It runs entirely in the browser and does not require an account:

[Weekly Timesheet Calculator](https://www.minutestodecimal.org/weekly-timesheet-calculator)

There is also a full minutes-to-decimal chart here:

[Minutes to Decimal Conversion Chart](https://www.minutestodecimal.org/minutes-to-decimal-chart)

---

## Summary

The core payroll conversion is:

```text
decimal hours = (end - start - unpaid lunch) ÷ 60
```

In JavaScript:

```js
const hours = workMinutes(start, end, lunch) / 60;
```

For overnight shifts:

```js
let minutes = toMinutes(end) - toMinutes(start);

if (minutes < 0) {
  minutes += 24 * 60;
}
```

Then:

```js
const weeklyHours = days.reduce(
  (total, day) => total + calculateShift(day.start, day.end, day.lunch).hours,
  0
);
```

Finally:

```js
const regular = Math.min(weeklyHours, 40);
const overtime = Math.max(0, weeklyHours - 40);
```

Keep minutes for arithmetic, decimal hours for payroll, and formatted strings for display. That separation will save you from most timesheet math bugs.
