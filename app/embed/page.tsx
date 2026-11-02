import type { Metadata } from "next";
import UnitConverter, { ConverterMode } from "@/components/UnitConverter";
import EmbedHint from "@/components/EmbedHint";

// 可嵌入 widget 页：供第三方 iframe 引用，不参与索引
const MODES: readonly ConverterMode[] = [
  "hoursToMinutes",
  "minutesToHours",
  "decimalToHours",
  "secondsToMinutes",
];

export const metadata: Metadata = {
  title: "Minutes to Decimal Widget",
  description: "Embed the free minutes to decimal calculator on your own site.",
  robots: { index: false, follow: false },
};

export default function EmbedPage({
  searchParams,
}: {
  searchParams: { mode?: string };
}) {
  const mode = (MODES as readonly string[]).includes(searchParams.mode ?? "")
    ? (searchParams.mode as ConverterMode)
    : "minutesToHours";

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      {/* widget 用途：隐藏全站 header/footer（作用域仅本页） */}
      <style>{`body > header, body > footer { display: none !important; }`}</style>
      <UnitConverter mode={mode} />
      <EmbedHint mode={mode} />
    </div>
  );
}
