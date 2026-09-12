# Hashnode article kit

## Recommended title

Time Math for Developers: Converting HH:MM to Decimal Payroll Hours

## Alternative titles

- How to Build a Timesheet Calculator That Handles Overnight Shifts
- The Correct Way to Convert Hours and Minutes into Decimal Hours
- A Practical Guide to Payroll Time Calculations

## Suggested tags

- javascript
- webdev
- productivity
- tutorial
- programming

## Article outline

1. The problem with using clock time as duration
2. Convert a time string to minutes since midnight
3. Calculate shift duration
4. Handle shifts that cross midnight
5. Subtract unpaid lunch
6. Convert minutes to decimal hours
7. Split regular and overtime hours
8. Avoid floating-point surprises
9. Practical UI considerations
10. Link to the free Weekly Timesheet Calculator

## Code example angle

Use a simple function like:

```js
function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function workHours(start, end, unpaidLunch = 0) {
  let minutes = toMinutes(end) - toMinutes(start);
  if (minutes < 0) minutes += 24 * 60;
  return Math.max(0, minutes - unpaidLunch) / 60;
}
```

Then explain:

- Why `22:00` to `06:00` must become 8 hours
- Why lunch should be subtracted before division
- Why payroll wants `8.00`, not `8:00`
- Why you should keep the result as a number and format only for display

## Closing CTA

For a working implementation, try the free Weekly Timesheet Calculator:

https://www.minutestodecimal.org/weekly-timesheet-calculator
