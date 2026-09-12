# A Practical Guide to Timesheet Decimal Hours

Most timesheet mistakes are not arithmetic mistakes. They are format mistakes.

You know you worked 7 hours and 45 minutes. Payroll wants a single number. If you write 7.45, you have just turned 45 minutes into 27 minutes.

The correct decimal is 7.75.

This guide explains the small amount of time math that makes timesheets, invoices, and paychecks much easier to audit.

---

## Why payroll uses decimal hours

Payroll systems multiply hours by a wage.

That math is simple when hours are written as a decimal:

```text
7.75 hours × $20.00 = $155.00
```

It becomes messy when hours and minutes are mixed:

```text
7 hours 45 minutes × $20.00 = ?
```

Before payroll can multiply, it has to convert the 45 minutes into a fraction of an hour.

That fraction is:

```text
45 ÷ 60 = 0.75
```

So the payroll-ready value is:

```text
7.75
```

This is why many timesheets and payroll systems ask for decimal hours instead of clock-style durations.

---

## The one formula that matters

The formula is:

```text
decimal hours = hours + (minutes ÷ 60)
```

If you worked 7 hours and 45 minutes:

```text
7 + (45 ÷ 60)
= 7 + 0.75
= 7.75 decimal hours
```

If you worked 8 hours and 20 minutes:

```text
8 + (20 ÷ 60)
= 8 + 0.3333
= 8.3333 decimal hours
```

Payroll systems commonly round to two decimal places, so 8.3333 may appear as 8.33.

---

## The four conversions worth memorizing

Four values show up on almost every timesheet:

| Minutes | Decimal hours |
|---:|---:|
| 15 | 0.25 |
| 30 | 0.50 |
| 45 | 0.75 |
| 60 | 1.00 |

If you remember those four, you can usually sanity-check a timesheet without a calculator.

Examples:

```text
7h 15m = 7.25
7h 30m = 7.50
7h 45m = 7.75
8h 00m = 8.00
```

---

## Why 4.35 does not mean 4 hours 35 minutes

This is the most common decimal-time misunderstanding.

On a decimal timesheet:

```text
4.35
```

means:

```text
4 hours + 0.35 of an hour
```

To convert 0.35 of an hour into minutes:

```text
0.35 × 60 = 21 minutes
```

So 4.35 decimal hours is:

```text
4 hours 21 minutes
```

It is not 4 hours 35 minutes.

If you actually worked 4 hours and 35 minutes, the correct payroll value is:

```text
4 + (35 ÷ 60)
= 4 + 0.5833
= 4.58
```

So:

```text
4:35 → 4.58
```

Not:

```text
4:35 → 4.35
```

---

## How to subtract an unpaid lunch break

Unpaid lunch breaks are subtracted before converting to decimal hours.

Suppose you work:

```text
09:00 to 17:30
```

with a 30-minute unpaid lunch.

The total elapsed time is 8 hours 30 minutes.

Subtract the unpaid lunch:

```text
8h 30m − 0h 30m = 8h 00m
```

Then convert:

```text
8.00 decimal hours
```

If the shift were:

```text
09:00 to 17:45
```

with a 30-minute unpaid lunch:

```text
8h 45m − 0h 30m = 8h 15m
8 + (15 ÷ 60) = 8.25
```

So the payroll value is:

```text
8.25
```

Paid breaks are different. If a break is paid, it stays inside your work time and should not be subtracted.

---

## How to calculate a weekly total

Convert each day separately, then add the decimal values.

Example:

| Day | Worked time | Decimal hours |
|---|---|---:|
| Monday | 8h 00m | 8.00 |
| Tuesday | 7h 30m | 7.50 |
| Wednesday | 8h 15m | 8.25 |
| Thursday | 7h 45m | 7.75 |
| Friday | 8h 00m | 8.00 |

Weekly total:

```text
8.00 + 7.50 + 8.25 + 7.75 + 8.00 = 39.50
```

So the workweek is:

```text
39.50 decimal hours
```

Do not add times like 8:00, 7:30, and 8:15 as though they were decimal numbers. Convert first, then add.

---

## How overtime is split

A common payroll rule is that overtime starts after 40 hours in a workweek.

If your weekly total is 43.75 hours:

```text
Regular hours = 40.00
Overtime hours = 3.75
```

If your regular hourly rate is $20.00 and overtime is paid at 1.5×:

```text
Regular pay:
40.00 × $20.00 = $800.00

Overtime pay:
3.75 × $30.00 = $112.50

Total gross pay:
$800.00 + $112.50 = $912.50
```

This is why decimal hours matter. Once the week is expressed as a single number, overtime becomes a subtraction problem.

---

## How to audit your own timesheet

If you want to check a paycheck, do this:

1. Record your actual clock-in and clock-out times.
2. Subtract unpaid lunch.
3. Convert each day to decimal hours.
4. Add the weekly total.
5. Compare your total with the pay stub.
6. Check whether overtime was split correctly.

If the numbers do not match, look for these common causes:

- Unpaid lunch was deducted
- Paid break was treated as unpaid
- The workweek starts on a different day
- Time card rounding was applied
- Overtime was calculated by day instead of by week
- Your employer uses a different threshold

Do not assume the mistake is always in your favor or always against you. Audit the numbers first.

---

## When rounding rules matter

Some employers round clock times before calculating pay.

Common rounding rules include:

- Nearest 5 minutes
- Nearest 6 minutes
- Nearest 10 minutes
- Nearest 15 minutes
- Nearest 1/10 hour
- Nearest 1/100 hour

Example:

```text
Clock in: 08:04
Clock out: 16:58
```

Depending on the rule, the rounded punches may become different values.

That is why two people can calculate slightly different totals from the same raw punches.

If you are auditing a paycheck, use the same rounding rule your employer uses before comparing totals.

---

## A quick worked example

Suppose you worked:

```text
Monday: 09:00–17:30, 30-minute unpaid lunch
Tuesday: 08:30–17:00, 30-minute unpaid lunch
Wednesday: 09:15–17:45, 30-minute unpaid lunch
Thursday: 08:00–16:30, 30-minute unpaid lunch
Friday: 09:00–15:45, 30-minute unpaid lunch
```

Convert each day:

| Day | Decimal hours |
|---|---:|
| Monday | 8.00 |
| Tuesday | 8.00 |
| Wednesday | 8.00 |
| Thursday | 8.00 |
| Friday | 6.25 |

Weekly total:

```text
38.25 decimal hours
```

No overtime is due under a 40-hour weekly threshold.

If your hourly rate is $22.00:

```text
38.25 × $22.00 = $841.50
```

That is the gross pay before taxes and deductions.

---

## Free tools that do the math for you

You can test every example in this article with free browser-based calculators:

- [Tools directory](https://www.minutestodecimal.org/tools)
- [Weekly Timesheet Calculator](https://www.minutestodecimal.org/weekly-timesheet-calculator)
- [Minutes to Decimal Conversion Chart](https://www.minutestodecimal.org/minutes-to-decimal-chart)

The Weekly Timesheet Calculator handles:

- Clock-in and clock-out times
- Unpaid lunch breaks
- Overnight shifts
- Weekly totals
- Regular and overtime hour splitting
- Estimated gross pay

---

## Summary

The core rule is simple:

```text
decimal hours = hours + (minutes ÷ 60)
```

The four landmarks are:

```text
15 minutes = 0.25
30 minutes = 0.50
45 minutes = 0.75
60 minutes = 1.00
```

Remember:

- 4.35 hours is not 4 hours 35 minutes
- Subtract unpaid lunch before converting
- Convert each day before adding the week
- Split overtime only after the weekly total
- Check the rounding rule before comparing totals

Once you separate clock time, duration, and decimal hours, most timesheet confusion disappears.
