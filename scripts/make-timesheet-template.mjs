// 生成周工时表 Excel 模板（内置十进制换算公式），输出到 public/
// 运行前需临时安装依赖：npm i -D exceljs（生成完成后可移除，站点构建不依赖它）
// 运行：node scripts/make-timesheet-template.mjs
import ExcelJS from "exceljs";

const INK = "FF0F172A";
const BRAND = "FF2563EB";
const LIGHT = "FFF1F5F9";
const INPUT_FILL = "FFFFF7CC"; // 黄色 = 需要用户填写

const wb = new ExcelJS.Workbook();
wb.creator = "minutestodecimal.org";

const ws = wb.addWorksheet("Weekly Timesheet", {
  views: [{ showGridLines: false }],
});
ws.columns = [
  { width: 10 }, // A Day
  { width: 14 }, // B Clock In
  { width: 14 }, // C Clock Out
  { width: 14 }, // D Lunch (min)
  { width: 16 }, // E Duration (h:mm)
  { width: 16 }, // F Decimal Hours
];

// 标题
ws.mergeCells("A1:F1");
ws.getCell("A1").value = "Weekly Timesheet — Decimal Hours";
ws.getCell("A1").font = { size: 18, bold: true, color: { argb: "FFFFFFFF" } };
ws.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: INK } };
ws.getCell("A1").alignment = { vertical: "middle", horizontal: "center" };
ws.getRow(1).height = 34;

ws.mergeCells("A2:F2");
ws.getCell("A2").value =
  "Fill the yellow cells only (clock times like 9:00 AM or 17:30). Everything else calculates itself. Free template from minutestodecimal.org";
ws.getCell("A2").font = { size: 10, italic: true, color: { argb: "FF64748B" } };
ws.getCell("A2").alignment = { horizontal: "center", vertical: "middle" };
ws.getRow(2).height = 24;

// 信息区
ws.getCell("A4").value = "Employee";
ws.getCell("B4").value = "Your name";
ws.getCell("D4").value = "Week starting";
ws.getCell("E4").value = new Date(2026, 10, 16); // 周一
ws.getCell("E4").numFmt = "yyyy-mm-dd";
for (const ref of ["A4", "D4"]) ws.getCell(ref).font = { bold: true };
for (const ref of ["B4", "E4"]) {
  ws.getCell(ref).fill = { type: "pattern", pattern: "solid", fgColor: { argb: INPUT_FILL } };
  ws.getCell(ref).border = { bottom: { style: "thin" } };
}

// 表头
const header = ["Day", "Clock In", "Clock Out", "Lunch (min)", "Duration (h:mm)", "Decimal Hours"];
const headerRow = 6;
header.forEach((h, i) => {
  const cell = ws.getRow(headerRow).getCell(i + 1);
  cell.value = h;
  cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND } };
  cell.alignment = { horizontal: "center", vertical: "middle" };
  cell.border = { bottom: { style: "thin" } };
});
ws.getRow(headerRow).height = 22;

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const startRow = 7;
days.forEach((day, i) => {
  const r = startRow + i;
  const row = ws.getRow(r);
  row.getCell(1).value = day;
  row.getCell(1).font = { bold: true };
  // 示例：周一预填一组数据，其余留空
  if (i === 0) {
    row.getCell(2).value = "09:00";
    row.getCell(3).value = "17:30";
    row.getCell(4).value = 30;
  }
  // 时长（h:mm）：跨午夜用 MOD 取正
  row.getCell(5).value = `=IF(OR(B${r}="",C${r}=""),"",MOD(C${r}-B${r},1)-D${r}/1440)`;
  row.getCell(5).numFmt = "h:mm";
  // 十进制小时
  row.getCell(6).value = `=IF(E${r}="","",ROUND(E${r}*24,2))`;
  row.getCell(6).numFmt = "0.00";
  for (let c = 2; c <= 6; c++) {
    const cell = row.getCell(c);
    cell.border = { bottom: { style: "hair", color: { argb: "FFE2E8F0" } } };
    cell.alignment = { horizontal: "center" };
    if (c <= 4) cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: INPUT_FILL } };
  }
});

// 合计区
const totalRow = startRow + days.length; // 14
const tr = ws.getRow(totalRow);
tr.getCell(1).value = "Total";
tr.getCell(1).font = { bold: true, size: 12 };
tr.getCell(5).value = `=IF(SUM(E${startRow}:E${totalRow - 1})=0,"",SUM(E${startRow}:E${totalRow - 1}))`;
tr.getCell(5).numFmt = "h:mm";
tr.getCell(5).font = { bold: true };
tr.getCell(6).value = `=ROUND(SUM(F${startRow}:F${totalRow - 1}),2)`;
tr.getCell(6).numFmt = "0.00";
tr.getCell(6).font = { bold: true, size: 12, color: { argb: BRAND } };
for (let c = 1; c <= 6; c++) tr.getCell(c).border = { top: { style: "medium" } };

const regRow = totalRow + 1;
ws.getCell(`A${regRow}`).value = "Regular hours (≤ 40)";
ws.getCell(`F${regRow}`).value = `=MIN(F${totalRow},40)`;
ws.getCell(`F${regRow}`).numFmt = "0.00";
const otRow = regRow + 1;
ws.getCell(`A${otRow}`).value = "Overtime hours (× 1.5)";
ws.getCell(`F${otRow}`).value = `=MAX(F${totalRow}-40,0)`;
ws.getCell(`F${otRow}`).numFmt = "0.00";
for (const ref of [`A${regRow}`, `A${otRow}`]) ws.getCell(ref).font = { color: { argb: "FF64748B" } };

// 工资区
const rateRow = otRow + 2;
ws.getCell(`A${rateRow}`).value = "Hourly rate ($)";
ws.getCell(`A${rateRow}`).font = { bold: true };
ws.getCell(`B${rateRow}`).value = 20;
ws.getCell(`B${rateRow}`).numFmt = '"$"#,##0.00';
ws.getCell(`B${rateRow}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: INPUT_FILL } };
const payReg = rateRow + 1;
ws.getCell(`A${payReg}`).value = "Regular pay";
ws.getCell(`B${payReg}`).value = `=F${regRow}*B${rateRow}`;
ws.getCell(`B${payReg}`).numFmt = '"$"#,##0.00';
const payOt = payReg + 1;
ws.getCell(`A${payOt}`).value = "Overtime pay (× 1.5)";
ws.getCell(`B${payOt}`).value = `=F${otRow}*B${rateRow}*1.5`;
ws.getCell(`B${payOt}`).numFmt = '"$"#,##0.00';
const payTotal = payOt + 1;
ws.getCell(`A${payTotal}`).value = "Total pay";
ws.getCell(`A${payTotal}`).font = { bold: true, size: 12 };
ws.getCell(`B${payTotal}`).value = `=B${payReg}+B${payOt}`;
ws.getCell(`B${payTotal}`).numFmt = '"$"#,##0.00';
ws.getCell(`B${payTotal}`).font = { bold: true, size: 12, color: { argb: BRAND } };

// 页脚说明
const noteRow = payTotal + 2;
ws.mergeCells(`A${noteRow}:F${noteRow}`);
ws.getCell(`A${noteRow}`).value =
  "Midnight shifts: MOD() keeps the duration positive automatically. Rounds decimal hours to 2 places. minutestodecimal.org — free converter, chart and guides.";
ws.getCell(`A${noteRow}`).font = { size: 9, italic: true, color: { argb: "FF94A3B8" } };
ws.getCell(`A${noteRow}`).alignment = { horizontal: "center" };

/* ---------------- Sheet 2：分钟换算对照表 ---------------- */
const ws2 = wb.addWorksheet("Minutes to Decimal", { views: [{ showGridLines: false }] });
ws2.columns = [{ width: 12 }, { width: 18 }];
ws2.getCell("A1").value = "Min";
ws2.getCell("B1").value = "Decimal hours";
["A1", "B1"].forEach((ref) => {
  ws2.getCell(ref).font = { bold: true, color: { argb: "FFFFFFFF" } };
  ws2.getCell(ref).fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND } };
  ws2.getCell(ref).alignment = { horizontal: "center" };
});
for (let m = 1; m <= 60; m++) {
  const r = m + 1;
  ws2.getRow(r).getCell(1).value = m;
  ws2.getRow(r).getCell(2).value = Number((m / 60).toFixed(2));
  ws2.getRow(r).getCell(2).numFmt = "0.00";
  if (m % 15 === 0) {
    for (const c of [1, 2]) {
      ws2.getRow(r).getCell(c).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDBE4EE" } };
      ws2.getRow(r).getCell(c).font = { bold: true };
    }
  }
}

await wb.xlsx.writeFile("public/weekly-timesheet-template.xlsx");
console.log("written: public/weekly-timesheet-template.xlsx");
