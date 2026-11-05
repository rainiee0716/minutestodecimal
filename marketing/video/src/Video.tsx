import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

// 品牌色与网站保持一致（ink 深海军蓝 + 品牌蓝渐变结果面板）
const INK = "#0f172a";
const MUTED = "#64748b";
const BORDER = "#e2e8f0";
const LIGHT = "#f1f5f9";
const BLUE = "#2563eb";
const CYAN = "#22d3ee";
const GRADIENT = "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)";
const GOOD = "#16a34a";
const BAD = "#dc2626";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

const T: React.CSSProperties = { fontFamily };

/* ---------------- 科技感通用组件 ---------------- */

// 稳定伪随机（渲染帧间一致）
const seeded = (n: number): number => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// 深空底：径向渐变 + 透视网格 + 漂浮粒子 + 色彩光球
const TechBackground: React.FC<{ accent?: string }> = ({ accent = CYAN }) => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const drift = (frame * 0.6) % 80; // 网格缓移

  const particles = Array.from({ length: 34 }, (_, i) => {
    const x = seeded(i) * 1920;
    const baseY = seeded(i + 100) * height;
    const speed = 0.35 + seeded(i + 200) * 0.75;
    const size = 2 + seeded(i + 300) * 3.5;
    const y = height - ((baseY + frame * speed) % (height + 60));
    const tw = 0.35 + 0.65 * Math.abs(Math.sin(frame * 0.05 + i));
    return { x, y, size, tw, i };
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* 深空渐变底 */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(1200px 700px at 75% -10%, #1e3a8a33 0%, transparent 60%),
            radial-gradient(900px 600px at 10% 110%, ${accent}22 0%, transparent 55%),
            linear-gradient(180deg, #0b1224 0%, ${INK} 55%, #0b1224 100%)`,
        }}
      />
      {/* 透视网格（双层对向缓移） */}
      <AbsoluteFill
        style={{
          opacity: 0.16,
          background: `repeating-linear-gradient(0deg, ${accent}30 0px, ${accent}30 1px, transparent 1px, transparent 80px),
            repeating-linear-gradient(90deg, ${accent}30 0px, ${accent}30 1px, transparent 1px, transparent 80px)`,
          backgroundPosition: `0px ${drift}px, ${drift}px 0px`,
          maskImage: "radial-gradient(75% 75% at 50% 45%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(75% 75% at 50% 45%, black 30%, transparent 100%)",
        }}
      />
      {/* 色彩光球 */}
      {[
        { x: 180, y: 140, s: 420, c: "#2563eb" },
        { x: 1500, y: 700, s: 520, c: accent },
      ].map((o, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: o.x + Math.sin(frame * 0.012 + i * 2) * 40,
            top: o.y + Math.cos(frame * 0.01 + i * 2) * 30,
            width: o.s,
            height: o.s,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${o.c}44 0%, transparent 70%)`,
            filter: "blur(10px)",
          }}
        />
      ))}
      {/* 漂浮发光粒子 */}
      {particles.map((p) => (
        <div
          key={p.i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: accent,
            opacity: 0.28 * p.tw,
            boxShadow: `0 0 ${6 + p.size * 2}px ${accent}`,
          }}
        />
      ))}
      {/* 暗角 */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(100% 100% at 50% 50%, transparent 62%, rgba(2,6,23,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// 场景入场：透明度 + 模糊 + 缩放的科技感转场
const SceneIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        opacity: p,
        filter: `blur(${(1 - p) * 10}px)`,
        transform: `scale(${1.05 - 0.05 * p})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// HUD 四角括号（放在内容容器外层）
const HudCorners: React.FC<{ color?: string; inset?: number; size?: number }> = ({
  color = CYAN,
  inset = 46,
  size = 46,
}) => {
  const corner: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    borderColor: color,
    borderStyle: "solid",
    opacity: 0.75,
  };
  return (
    <>
      <div style={{ ...corner, left: inset, top: inset, borderWidth: "2px 0 0 2px" }} />
      <div style={{ ...corner, right: inset, top: inset, borderWidth: "2px 2px 0 0" }} />
      <div style={{ ...corner, left: inset, bottom: inset, borderWidth: "0 0 2px 2px" }} />
      <div style={{ ...corner, right: inset, bottom: inset, borderWidth: "0 2px 2px 0" }} />
    </>
  );
};

// 数字霓虹辉光（呼吸脉冲）
const glowPulse = (frame: number, color: string): string =>
  `0 0 ${18 + Math.sin(frame * 0.09) * 9}px ${color}66`;

const BrowserFrame: React.FC<{ children: React.ReactNode; url?: string }> = ({
  children,
  url = "www.minutestodecimal.org",
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        ...T,
        width: 1240,
        height: 780,
        background: "#ffffff",
        borderRadius: 20,
        border: `1px solid ${BORDER}`,
        boxShadow: `0 30px 90px rgba(2,6,23,0.65), 0 0 60px ${CYAN}22`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* 扫描光带：自上而下循环扫过 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 90,
          top: `${(frame * 3.2) % 900 - 90}px`,
          background: `linear-gradient(180deg, transparent 0%, ${CYAN}14 60%, ${CYAN}30 100%)`,
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
      <div
        style={{
          height: 56,
          background: "#0b1224",
          borderBottom: `1px solid ${CYAN}40`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 22px",
        }}
      >
        {["#f87171", "#fbbf24", "#34d399"].map((c) => (
          <div key={c} style={{ width: 14, height: 14, borderRadius: 999, background: c }} />
        ))}
        <div
          style={{
            marginLeft: 18,
            flex: 1,
            background: "#0f172a",
            border: `1px solid #1e293b`,
            borderRadius: 10,
            fontSize: 16,
            color: "#7dd3fc",
            fontFamily: "Menlo, monospace",
            padding: "6px 16px",
          }}
        >
          {url}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</div>
    </div>
  );
};

const Label: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div style={{ ...T, fontSize: 15, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: MUTED, marginBottom: 10, ...style }}>
    {children}
  </div>
);

/* ---------------- 场景 1：Hook（常见错误） ---------------- */

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-40s: 大数字 4.35 弹入
  const pop = spring({ frame, fps, config: { damping: 200 } });
  // 55-75: 错误读法出现并划掉
  const wrong = interpolate(frame, [55, 75], [0, 1], { extrapolateRight: "clamp" });
  const strike = interpolate(frame, [88, 104], [0, 1], { extrapolateRight: "clamp" });
  // 105: 正确答案弹出
  const right = spring({ frame: frame - 105, fps, config: { damping: 12, stiffness: 160 } });

  return (
    <SceneIn>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <TechBackground />
        <HudCorners />
        <div style={{ transform: `scale(${0.9 + 0.1 * pop})`, textAlign: "center", position: "relative" }}>
          <div style={{ fontSize: 46, color: "#7dd3fc", fontWeight: 600, marginBottom: 24, letterSpacing: 0.5 }}>
            A shift ends at <span style={{ fontFamily: "Menlo, monospace" }}>4.35</span> on the timesheet.
          </div>
          <div
            style={{
              fontSize: 210,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1,
              fontFamily: "Menlo, monospace",
              textShadow: glowPulse(frame, CYAN),
            }}
          >
            4.35
          </div>
          <div style={{ height: 130, marginTop: 40, position: "relative" }}>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: "#fca5a5",
                opacity: wrong,
                display: "inline-block",
                position: "relative",
                textShadow: "0 0 24px #dc262655",
              }}
            >
              = 4 h 35 m ?
              <div
                style={{
                  position: "absolute",
                  left: -10,
                  top: "50%",
                  width: `${interpolate(strike, [0, 1], [0, 104])}%`,
                  height: 7,
                  background: BAD,
                  borderRadius: 4,
                  boxShadow: "0 0 18px #dc262699",
                }}
              />
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: GOOD,
                transform: `scale(${right})`,
                opacity: right,
                position: "absolute",
                left: 0,
                right: 0,
                textShadow: "0 0 28px #16a34a66",
              }}
            >
              = 4 h 21 m ✓
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneIn>
  );
};

/* ---------------- 场景 2：转换器演示 ---------------- */

const DigitType: React.FC<{ text: string; start: number; speed?: number }> = ({ text, start, speed = 6 }) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.min(text.length, Math.floor((frame - start) / speed)));
  return <>{text.slice(0, n)}</>;
};

const ConverterScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 结果数字滚动
  const resultProgress = interpolate(frame, [95, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const result = (resultProgress * 7.75).toFixed(2);

  // 反向转换提前进场，确保答案打字在场景结束前完成
  const reversePop = spring({ frame: frame - 160, fps, config: { damping: 14 } });

  return (
    <SceneIn>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <TechBackground />
        <BrowserFrame>
          <div style={{ background: INK, padding: "26px 60px", flex: 1 }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: "#ffffff", marginBottom: 6 }}>
              Minutes to Decimal Converter
            </div>
            <div style={{ fontSize: 16, color: "#7dd3fc", marginBottom: 30, fontFamily: "Menlo, monospace" }}>
              Free · Instant · Runs in your browser — nothing is sent to a server
            </div>

            {/* 正向转换 */}
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 26 }}>
              <div style={{ background: "#ffffff", borderRadius: 16, padding: "18px 28px", display: "flex", gap: 20, alignItems: "flex-end" }}>
                <div>
                  <Label>Hours</Label>
                  <div style={{ fontSize: 54, fontWeight: 800, color: INK, minWidth: 110, borderBottom: `3px solid ${BLUE}`, fontFamily: "Menlo, monospace" }}>
                    <DigitType text="7" start={20} />
                  </div>
                </div>
                <div>
                  <Label>Minutes</Label>
                  <div style={{ fontSize: 54, fontWeight: 800, color: INK, minWidth: 150, borderBottom: `3px solid ${BLUE}`, fontFamily: "Menlo, monospace" }}>
                    <DigitType text="45" start={38} />
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 44, color: "#7dd3fc" }}>→</div>
              <div
                style={{
                  background: GRADIENT,
                  borderRadius: 16,
                  padding: "18px 34px",
                  minWidth: 300,
                  textAlign: "center",
                  boxShadow: glowPulse(frame, CYAN),
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 1.5, color: "rgba(255,255,255,0.75)", textTransform: "uppercase" }}>
                  Decimal hours
                </div>
                <div style={{ fontSize: 64, fontWeight: 800, color: "#ffffff", fontFamily: "Menlo, monospace" }}>{result}</div>
              </div>
            </div>

            {/* 反向转换 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                opacity: reversePop,
                transform: `translateY(${(1 - reversePop) * 30}px)`,
              }}
            >
              <div style={{ background: "#ffffff", borderRadius: 16, padding: "18px 28px" }}>
                <Label>Decimal hours</Label>
                <div style={{ fontSize: 54, fontWeight: 800, color: INK, borderBottom: `3px solid ${BLUE}`, minWidth: 160, fontFamily: "Menlo, monospace" }}>
                  <DigitType text="1.5" start={190} />
                </div>
              </div>
              <div style={{ fontSize: 44, color: "#7dd3fc" }}>→</div>
              <div style={{ background: "#ffffff", border: `2px solid ${BLUE}`, borderRadius: 16, padding: "18px 34px", minWidth: 300, textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 1.5, color: MUTED, textTransform: "uppercase" }}>
                  Hours & minutes
                </div>
                <div style={{ fontSize: 64, fontWeight: 800, color: BLUE, fontFamily: "Menlo, monospace" }}>
                  <DigitType text="1 h 30 m" start={225} speed={3} />
                </div>
              </div>
            </div>
          </div>
        </BrowserFrame>
      </AbsoluteFill>
    </SceneIn>
  );
};

/* ---------------- 场景 3：周工时计算器 ---------------- */

const ROWS: [string, string, string, string][] = [
  ["Mon", "09:00 – 18:30", "30 min lunch", "8.00"],
  ["Tue", "08:30 – 17:45", "45 min lunch", "8.50"],
  ["Wed", "09:15 – 18:45", "30 min lunch", "9.00"],
  ["Thu", "08:45 – 18:15", "30 min lunch", "8.75"],
  ["Fri", "09:00 – 18:15", "30 min lunch", "8.75"],
];

const TimesheetScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalPop = spring({ frame: frame - 130, fps, config: { damping: 14 } });
  const chipsPop = spring({ frame: frame - 170, fps, config: { damping: 16 } });

  return (
    <SceneIn>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <TechBackground />
        <BrowserFrame url="www.minutestodecimal.org/weekly-timesheet-calculator">
          <div style={{ background: INK, padding: "24px 60px", flex: 1 }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: "#ffffff", marginBottom: 24 }}>
              Weekly Timesheet Calculator
            </div>

            <div style={{ background: "#ffffff", borderRadius: 16, overflow: "hidden" }}>
              {ROWS.map(([day, time, lunch, hours], i) => {
                const rowIn = spring({ frame: frame - 15 * i - 10, fps, config: { damping: 200 } });
                return (
                  <div
                    key={day}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "13px 26px",
                      borderBottom: "1px solid #eef2f7",
                      opacity: rowIn,
                      transform: `translateX(${(1 - rowIn) * -40}px)`,
                    }}
                  >
                    <div style={{ width: 80, fontWeight: 700, color: INK, fontSize: 24 }}>{day}</div>
                    <div style={{ flex: 1, color: "#334155", fontSize: 22, fontFamily: "Menlo, monospace" }}>{time}</div>
                    <div style={{ width: 200, color: MUTED, fontSize: 19 }}>{lunch}</div>
                    <div style={{ width: 110, textAlign: "right", fontWeight: 800, color: BLUE, fontSize: 26, fontFamily: "Menlo, monospace" }}>{hours}</div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 22,
                background: GRADIENT,
                borderRadius: 16,
                padding: "16px 30px",
                opacity: totalPop,
                transform: `scale(${0.94 + 0.06 * totalPop})`,
                boxShadow: glowPulse(frame + 40, CYAN),
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,0.85)", textTransform: "uppercase", letterSpacing: 1.5, flex: 1 }}>
                Weekly total
              </div>
              <div style={{ fontSize: 44, fontWeight: 800, color: "#ffffff", fontFamily: "Menlo, monospace" }}>43.75 h</div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 20,
                marginTop: 20,
                opacity: chipsPop,
                transform: `translateY(${(1 - chipsPop) * 24}px)`,
              }}
            >
              {[
                ["Regular", "40.00 h"],
                ["Overtime × 1.5", "3.75 h"],
              ].map(([k, v]) => (
                <div key={k} style={{ flex: 1, background: "#ffffff", border: `1px solid ${BORDER}`, borderRadius: 14, padding: "14px 24px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 20, color: MUTED, fontWeight: 600 }}>{k}</span>
                  <span style={{ fontSize: 26, fontWeight: 800, color: INK, fontFamily: "Menlo, monospace" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </BrowserFrame>
      </AbsoluteFill>
    </SceneIn>
  );
};

/* ---------------- 场景 4：Chart + 可打印 PDF ---------------- */

const ChartRows: [string, string][] = [
  ["14", "0.23"],
  ["15", "0.25"],
  ["16", "0.27"],
  ["29", "0.48"],
  ["30", "0.50"],
  ["31", "0.52"],
  ["44", "0.73"],
  ["45", "0.75"],
  ["46", "0.77"],
];

const ChartPdfScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pdfPop = spring({ frame: frame - 60, fps, config: { damping: 15 } });

  return (
    <SceneIn>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <TechBackground />
        <HudCorners />
        <div style={{ fontSize: 44, fontWeight: 800, color: "#ffffff", position: "absolute", top: 110, textShadow: glowPulse(frame, CYAN) }}>
          Every minute, 1 – 60. One page.
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 70, marginTop: 60 }}>
          {/* chart 卡片 */}
          <div style={{ background: "#ffffff", borderRadius: 18, padding: "26px 34px", boxShadow: "0 30px 80px rgba(0,0,0,0.4), 0 0 40px #22d3ee33" }}>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: 1.5, color: MUTED, textTransform: "uppercase", marginBottom: 14 }}>
              Minutes → Decimal
            </div>
            {ChartRows.map(([m, d], i) => {
              const hl = ["15", "30", "45"].includes(m);
              const rowIn = spring({ frame: frame - 8 * i, fps, config: { damping: 200 } });
              return (
                <div
                  key={m}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 90,
                    padding: "7px 16px",
                    borderRadius: 8,
                    background: hl ? "#dbe4ee" : i % 2 ? LIGHT : "transparent",
                    opacity: rowIn,
                    transform: `translateX(${(1 - rowIn) * -30}px)`,
                  }}
                >
                  <span style={{ fontSize: 24, fontWeight: hl ? 800 : 500, color: INK, fontFamily: "Menlo, monospace" }}>{m} min</span>
                  <span style={{ fontSize: 24, fontWeight: 800, color: BLUE, fontFamily: "Menlo, monospace" }}>{d}</span>
                </div>
              );
            })}
          </div>

          {/* PDF 纸张 */}
          <div
            style={{
              width: 340,
              height: 440,
              background: "#ffffff",
              borderRadius: 10,
              padding: 28,
              boxShadow: "0 40px 90px rgba(0,0,0,0.5), 0 0 50px #2563eb44",
              transform: `rotate(3deg) scale(${0.85 + 0.15 * pdfPop})`,
              opacity: pdfPop,
              position: "relative",
            }}
          >
            <div style={{ fontSize: 17, fontWeight: 800, color: INK, borderBottom: `2px solid ${INK}`, paddingBottom: 8 }}>
              Minutes to Decimal
            </div>
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #eef2f7" }}>
                <div style={{ height: 9, width: 60, background: "#e2e8f0", borderRadius: 4 }} />
                <div style={{ height: 9, width: 40, background: "#c7d2fe", borderRadius: 4 }} />
              </div>
            ))}
            <Img src={staticFile("qr.svg")} style={{ width: 64, height: 64, position: "absolute", right: 22, bottom: 18 }} />
            <div style={{ fontSize: 10, color: MUTED, position: "absolute", left: 24, bottom: 30 }}>
              minutestodecimal.org
            </div>
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#7dd3fc", position: "absolute", bottom: 100, fontFamily: "Menlo, monospace" }}>
          Print it. Pin it by the time clock. Scan the QR.
        </div>
      </AbsoluteFill>
    </SceneIn>
  );
};

/* ---------------- 场景 5：CTA ---------------- */

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = spring({ frame, fps, config: { damping: 14 } });
  const chips = spring({ frame: frame - 25, fps, config: { damping: 16 } });
  const qr = spring({ frame: frame - 50, fps, config: { damping: 16 } });
  const ring = interpolate(frame, [50, 130], [0, 1], { extrapolateRight: "clamp" });

  return (
    <SceneIn>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <TechBackground />
        <HudCorners />
        <div style={{ textAlign: "center", position: "relative" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "#ffffff",
              transform: `scale(${0.9 + 0.1 * title})`,
              opacity: title,
              fontFamily: "Menlo, monospace",
              textShadow: glowPulse(frame, "#60a5fa"),
            }}
          >
            minutestodecimal<span style={{ color: "#60a5fa" }}>.org</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 18,
              justifyContent: "center",
              marginTop: 40,
              opacity: chips,
              transform: `translateY(${(1 - chips) * 26}px)`,
            }}
          >
            {["Free", "No sign-up", "Runs in your browser", "Embeddable widget"].map((c) => (
              <div
                key={c}
                style={{
                  border: `1.5px solid ${CYAN}66`,
                  borderRadius: 999,
                  padding: "12px 30px",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#e2e8f0",
                  background: "#0b122488",
                  boxShadow: `0 0 20px ${CYAN}22`,
                }}
              >
                {c}
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 22,
              opacity: qr,
            }}
          >
            <div style={{ position: "relative", display: "flex" }}>
              {/* 旋转光环 */}
              <div
                style={{
                  position: "absolute",
                  inset: -14,
                  borderRadius: 20,
                  background: `conic-gradient(from ${frame * 2.4}deg, transparent 0deg, ${CYAN}88 60deg, transparent 120deg)`,
                  maskImage: "radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 3px))",
                  WebkitMaskImage: "radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 3px))",
                  opacity: ring,
                }}
              />
              <div style={{ background: "#ffffff", borderRadius: 14, padding: 14, position: "relative" }}>
                <Img src={staticFile("qr.svg")} style={{ width: 110, height: 110 }} />
              </div>
            </div>
            <div style={{ textAlign: "left", fontSize: 24, color: "#94a3b8", lineHeight: 1.5 }}>
              Convert hours to decimal
              <br />
              <span style={{ color: "#60a5fa", fontWeight: 700 }}>in seconds.</span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneIn>
  );
};

/* ---------------- 组合 ---------------- */

export const IntroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: INK }}>
      {/* 旁白：macOS Samantha TTS，按场景起点对齐；BGM 待补：
          从 YouTube Audio Library 挑免费曲子存为 public/bgm.m4a 后，
          在下方取消注释，并把每个 narration 音量调到 1、BGM 调到 0.12 左右 */}
      {/* <Audio src={staticFile("bgm.m4a")} volume={0.12} loop /> */}
      <Sequence from={0} durationInFrames={120}>
        <Audio src={staticFile("narration-1.m4a")} />
        <HookScene />
      </Sequence>
      <Sequence from={120} durationInFrames={270}>
        <Audio src={staticFile("narration-2.m4a")} />
        <ConverterScene />
      </Sequence>
      <Sequence from={390} durationInFrames={240}>
        <Audio src={staticFile("narration-3.m4a")} />
        <TimesheetScene />
      </Sequence>
      <Sequence from={630} durationInFrames={240}>
        <Audio src={staticFile("narration-4.m4a")} />
        <ChartPdfScene />
      </Sequence>
      <Sequence from={870} durationInFrames={210}>
        <Audio src={staticFile("narration-5.m4a")} />
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
