# How to Calculate Hours Worked in Excel Without Breaking Payroll Math

If you have ever built a timesheet, you have probably run into the same problem twice: clock times are easy for humans to read, but payroll systems want durations as decimal hours.

A shift from `09:00` to `17:30` is not `9.5` on a timesheet. It is `8.00` hours if you subtract a 30-minute lunch, and payroll usually wants that written as `8.00`, not `8:00`.

In this article, we’ll walk through the Excel formulas, the edge cases, and the small time-math mistakes that cause real payroll problems.

---

## 1. Clock time and duration are not the same thing

Before touching Excel, separate two ideas:

- **Clock time** answers “when did this happen?”  
  Examples: `09:00`, `17:30`, `22:00`

- **Duration** answers “how long did it last?”  
  Examples: `8 hours`, `7.5 hours`, `8.25 hours`

A timesheet usually starts with clock times, but payroll needs durations.

That means you have to convert:

```text
09:00 → 17:30
```

into:

```text
8.00 decimal hours
```

Once the duration is a decimal number, payroll can multiply it by an hourly rate.

---

## 2. The core Excel formula

If Excel stores your start and end times correctly, the basic formula is:

```excel
=(End - Start) * 24
```

Why multiply by 24?

Because Excel represents time as a fraction of a day:

```text
06:00 = 0.25 days
12:00 = 0.50 days
18:00 = 0.75 days
```

Multiplying by 24 converts that fraction into hours.

### Example

| A | B | C |
|---|---|---|
| Start | End | Hours |
| 09:00 | 17:30 | 8.00 |

In `C2`:

```excel
=(B2-A2)*24
```

Result:

```text
8.00
```

Make sure the result cell is formatted as a number, not as time.

---

## 3. Subtract an unpaid lunch break

If the shift has an unpaid lunch, subtract it before multiplying by 24.

Suppose:

- Start: `09:00`
- End: `17:30`
- Unpaid lunch: `30` minutes

If lunch minutes are stored in `D2`:

```excel
=((B2-A2)*24) - (D2/60)
```

Or if lunch is stored as `0:30`:

```excel
=((B2-A2)-D2)*24
```

For this example:

```text
17:30 - 09:00 = 8:00
8:00 - 0:30 = 7:30
7:30 = 7.50 decimal hours
```

So the payroll value is:

```text
7.50
```

Not `7.30`.

---

## 4. Why 7.30 is wrong

This is the mistake that causes the most confusion.

If you worked 7 hours 30 minutes, the decimal version is not `7.30`.

It is:

```text
7 + (30 ÷ 60)
= 7 + 0.50
= 7.50 decimal hours
```

The decimal part represents a fraction of an hour, not the minute number.

Another example:

```text
7 hours 45 minutes
= 7 + (45 ÷ 60)
= 7.75
```

So:

```text
7:45 → 7.75
```

Not `7.45`.

---

## 5. Handle shifts that cross midnight

A normal subtraction breaks when a shift goes overnight.

Example:

```text
Start: 22:00
End:   06:00
```

If you use:

```excel
=(B2-A2)*24
```

Excel will return a negative number.

The fix is to add one day when the end time is earlier than the start time:

```excel
=((B2-A2) + IF(B2<A2, 1, 0)) * 24
```

Or more simply:

```excel
=MOD(B2-A2, 1) * 24
```

For `22:00` to `06:00`, the result is:

```text
8.00 decimal hours
```

If you also subtract a 30-minute unpaid lunch:

```text
8.00 - 0.50 = 7.50
```

---

## 6. Convert HH:MM into decimal hours manually

If you have hours in one column and minutes in another:

| Hours | Minutes | Decimal hours |
|---:|---:|---:|
| 7 | 45 | 7.75 |

Formula:

```excel
=A2 + (B2/60)
```

This is the safest formula when your data already separates hours and minutes.

Examples:

```text
7h 15m = 7.25
7h 30m = 7.50
7h 45m = 7.75
8h 20m = 8.3333
```

Payroll systems commonly round to two decimal places, so `8.3333` may become `8.33`.

---

## 7. Calculate a weekly total

Once every day is in decimal hours, the weekly total is just a sum:

```excel
=SUM(C2:C8)
```

Example:

| Day | Decimal hours |
|---|---:|
| Mon | 8.00 |
| Tue | 7.50 |
| Wed | 8.25 |
| Thu | 7.75 |
| Fri | 8.00 |
| **Total** | **39.50** |

Do not sum clock times like `8:00`, `7:30`, and `8:15` and then treat the result as payroll hours. Convert first, then sum.

---

## 8. Split regular and overtime hours

If overtime starts after 40 hours in a workweek:

```excel
Regular hours:
=MIN(WeeklyTotal, 40)

Overtime hours:
=MAX(0, WeeklyTotal - 40)
```

Example:

```text
Weekly total = 43.75
Regular      = 40.00
Overtime     = 3.75
```

If your hourly rate is in `E2` and overtime is paid at 1.5×:

```excel
Regular pay:
=MIN(C2,40) * E2

Overtime pay:
=MAX(0,C2-40) * E2 * 1.5

Total pay:
=Regular pay + Overtime pay
```

At $20.00/hour:

```text
Regular pay:  40 × $20.00 = $800.00
Overtime pay: 3.75 × $30.00 = $112.50
Total gross:  $912.50
```

---

## 9. Avoid the four most common mistakes

### Mistake 1: Treating 4.35 as 4 hours 35 minutes

It is not.

```text
4.35 hours = 4 hours + 0.35 of an hour
0.35 × 60 = 21 minutes
```

So `4.35` is 4 hours 21 minutes.

If you worked 4 hours 35 minutes, the payroll value is:

```text
4 + (35 ÷ 60) = 4.58
```

---

### Mistake 2: Subtracting paid breaks

Only subtract unpaid lunch or unpaid breaks if your employer does not count them as hours worked.

If a break is paid, leave it inside the duration.

---

### Mistake 3: Mixing clock time and duration

A clock time like `14:30` is not the same as `14.30 hours`.

`14:30` is a time of day.

`14.30 hours` is a duration.

Convert durations to decimal hours before payroll calculations.

---

### Mistake 4: Rounding before checking the rule

Some employers round clock times to the nearest:

- 5 minutes
- 6 minutes
- 10 minutes
- 15 minutes
- 1/10 hour
- 1/100 hour

The rounding rule matters because two different rules can produce different totals.

If you are auditing a paycheck, apply the same rule your employer uses before comparing your result.

---

## 10. A compact Excel template

A simple timesheet layout can look like this:

| Day | Start | End | Unpaid lunch | Decimal hours |
|---|---|---|---:|---:|
| Mon | 09:00 | 17:30 | 30 | 7.50 |
| Tue | 08:30 | 17:00 | 30 | 8.00 |
| Wed | 09:15 | 17:45 | 30 | 8.00 |
| Thu | 08:00 | 16:30 | 30 | 8.00 |
| Fri | 09:00 | 15:45 | 30 | 6.25 |

For a shift that may cross midnight:

```excel
=MOD(B2-A2,1)*24 - (D2/60)
```

For a normal shift:

```excel
=(B2-A2)*24 - (D2/60)
```

A safer universal formula is:

```excel
=MOD(B2-A2,1)*24 - (D2/60)
```

Then sum the decimal hours column.

---

## Free calculator

If you want to check your Excel formulas without rebuilding the whole sheet, I built a free Weekly Timesheet Calculator that handles:

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

The core idea is simple:

```text
decimal hours = hours + (minutes ÷ 60)
```

For clock times in Excel:

```excel
=(End - Start) * 24
```

For overnight shifts:

```excel
=MOD(End - Start, 1) * 24
```

For unpaid lunch:

```excel
=MOD(End - Start, 1) * 24 - (UnpaidLunchMinutes / 60)
```

Convert first, sum second, and split overtime only after you know the weekly total.

That small order of operations will save you a lot of payroll headaches.
