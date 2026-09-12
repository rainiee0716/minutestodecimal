# DEV.to article kit

## Recommended title

How to Calculate Hours Worked in Excel Without Breaking Payroll Math

## Alternative titles

- A Developer's Guide to Time Card Math and Decimal Hours
- How to Convert HH:MM to Decimal Hours for Payroll
- How to Handle Overnight Shifts When Calculating Work Hours

## Target audience

- Freelancers who track their own hours
- Small business owners
- Developers building timesheet or scheduling tools
- HR and operations people who audit payroll

## Suggested tags

- excel
- javascript
- productivity
- payroll
- tutorial

## Article outline

1. Why clock times and payroll hours are different
   - Clock time answers “when”
   - Duration answers “how long”
   - Payroll wants decimal hours

2. The core formula
   - `(end - start) * 24`
   - Subtract unpaid lunch
   - Format as a number, not as time

3. Example 1: a normal day shift
   - 09:00 to 17:30 with a 30-minute lunch
   - Result: 8.00 decimal hours

4. Example 2: a shift that crosses midnight
   - 22:00 to 06:00
   - Why subtraction can go negative
   - How to add 24 hours when end < start

5. Example 3: overtime
   - Weekly total: 43.75
   - Regular: 40.00
   - Overtime: 3.75
   - Gross pay formula

6. Common mistakes
   - Treating 4.35 as 4 hours 35 minutes
   - Subtracting paid breaks
   - Mixing clock time and duration
   - Ignoring the workweek definition
   - Rounding before checking the employer rule

7. Free calculator
   - Link to https://www.minutestodecimal.org/weekly-timesheet-calculator
   - Explain that it handles lunch, overnight shifts, overtime, and weekly totals

## Opening draft

If you have ever built a timesheet, you have probably run into the same problem twice: clock times are easy for humans to read, but payroll systems want durations as decimal hours.

A shift from 09:00 to 17:30 is not "9.5" on a timesheet. It is 8.00 hours if you subtract a 30-minute lunch, and payroll usually wants that written as `8.00`, not `8:00`.

In this article, we’ll walk through the math, the Excel formulas, and the edge cases that cause real payroll mistakes.

## Closing CTA

If you want to check your results without rebuilding the logic, this free Weekly Timesheet Calculator handles clock times, unpaid lunch, overnight shifts, weekly totals, and overtime splitting:

https://www.minutestodecimal.org/weekly-timesheet-calculator
