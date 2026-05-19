// Tellix case-study deck — built with pptxgenjs.
//
// 12 slides, ~5 min talk, cross-functional audience.
// Engineering-depth palette: dark navy + teal + cyan accent.

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";        // 13.333 x 7.5"
pres.title = "Tellix — Building a Production AI System with Claude";
pres.author = "Tellix project";
pres.company = "Tellix";

// ---------- Palette ----------
const NAVY     = "0B1929";   // dominant dark
const NAVY_2   = "12243B";   // slightly lighter navy for cards on dark
const INK      = "1F2937";   // body on light
const SLATE    = "475569";   // muted body
const LIGHT    = "F4F7FA";   // light bg
const PAPER    = "FFFFFF";   // pure white for inner cards
const TEAL     = "14B8A6";   // primary accent
const CYAN     = "06B6D4";   // stat highlight
const EMERALD  = "10B981";   // success / "what worked"
const AMBER    = "F59E0B";   // attention / "what went wrong"
const HAIRLINE = "D6DEE8";   // subtle separators / card outline

// ---------- Helpers ----------
function darkBg(slide) { slide.background = { color: NAVY }; }
function lightBg(slide) { slide.background = { color: LIGHT }; }

// Page footer used on light content slides
function footer(slide, label) {
  slide.addText(label, {
    x: 0.5, y: 7.05, w: 8, h: 0.3,
    fontFace: "Calibri Light", fontSize: 10,
    color: SLATE,
  });
  slide.addText("github.com/victorjoe/tellix", {
    x: 9, y: 7.05, w: 3.8, h: 0.3,
    fontFace: "Calibri Light", fontSize: 10,
    color: TEAL, align: "right",
  });
}

// Vertical accent bar (left-side card marker). NOT a horizontal "accent line".
function accentBar(slide, x, y, h, color = TEAL) {
  slide.addShape("rect", {
    x: x, y: y, w: 0.07, h: h,
    fill: { color: color }, line: { type: "none" },
  });
}

// Simple "card" frame: paper rect + a vertical accent on the left.
function card(slide, x, y, w, h, accent = TEAL) {
  slide.addShape("rect", {
    x: x, y: y, w: w, h: h,
    fill: { color: PAPER }, line: { color: HAIRLINE, width: 0.5 },
  });
  accentBar(slide, x, y, h, accent);
}

// =====================================================================
// SLIDE 1 — Title (dark)
// =====================================================================
{
  const s = pres.addSlide();
  darkBg(s);

  // Small "tag" eyebrow
  s.addText("CASE STUDY", {
    x: 0.7, y: 1.0, w: 4, h: 0.4,
    fontFace: "Calibri", fontSize: 14, bold: true,
    color: TEAL, charSpacing: 6,
  });

  // Big title
  s.addText("Building a Production\nAI System with Claude", {
    x: 0.7, y: 1.6, w: 11.5, h: 2.4,
    fontFace: "Calibri Light", fontSize: 54, bold: true,
    color: PAPER, lineSpacing: 56,
  });

  // Subtitle
  s.addText("Tellix — a Windows screen recorder with live transcription, built end-to-end through directed AI collaboration.", {
    x: 0.7, y: 4.3, w: 11.5, h: 1.0,
    fontFace: "Calibri Light", fontSize: 18,
    color: "B6C2D2",
  });

  // Bottom strip: meta
  s.addShape("rect", {
    x: 0.7, y: 6.4, w: 0.07, h: 0.5,
    fill: { color: CYAN }, line: { type: "none" },
  });
  s.addText("Tellix 1.0.0   •   github.com/victorjoe/tellix   •   May 2026", {
    x: 0.9, y: 6.4, w: 11.5, h: 0.5,
    fontFace: "Calibri Light", fontSize: 14,
    color: "9CA8B8",
  });
}

// =====================================================================
// SLIDE 2 — The Brief
// =====================================================================
{
  const s = pres.addSlide();
  lightBg(s);

  s.addText("The brief", {
    x: 0.7, y: 0.5, w: 8, h: 0.7,
    fontFace: "Calibri Light", fontSize: 36, bold: true, color: INK,
  });
  s.addText("What we set out to build, and the constraints that mattered.", {
    x: 0.7, y: 1.2, w: 10, h: 0.4,
    fontFace: "Calibri Light", fontSize: 14, color: SLATE,
  });

  // Two cards: Goal (left), Constraints (right)
  card(s, 0.7, 2.0, 6.0, 4.4, TEAL);
  s.addText("The goal", {
    x: 1.0, y: 2.15, w: 5.5, h: 0.45,
    fontFace: "Calibri", fontSize: 18, bold: true, color: TEAL,
  });
  s.addText([
    { text: "A lightweight Windows tool that records the screen with audio, captures meeting participants from the speakers, shows live captions while recording, and produces a finished MP4 with embedded subtitles plus a clean transcript.\n\n",
      options: { fontSize: 14, color: INK, fontFace: "Calibri" } },
    { text: "Usable by non-technical people. No cloud calls. No API keys.",
      options: { fontSize: 14, color: INK, fontFace: "Calibri", italic: true } },
  ], { x: 1.0, y: 2.6, w: 5.5, h: 3.7, valign: "top", paraSpaceAfter: 6 });

  card(s, 7.0, 2.0, 5.6, 4.4, CYAN);
  s.addText("Constraints", {
    x: 7.3, y: 2.15, w: 5.0, h: 0.45,
    fontFace: "Calibri", fontSize: 18, bold: true, color: CYAN,
  });
  s.addText(
    "Local-only — audio never leaves the machine.\n" +
    "Single .exe — non-developers shouldn't install Python.\n" +
    "Graceful failure — silent breakage is unacceptable.\n" +
    "Open source — MIT, public repo, license-clean dependencies.\n" +
    "Production polish — CI/CD, docs, releases page, not just a script.",
    {
      x: 7.3, y: 2.65, w: 5.0, h: 3.6, valign: "top",
      bullet: { code: "25A0" },
      fontFace: "Calibri", fontSize: 13, color: INK,
      paraSpaceAfter: 8, lineSpacing: 20,
    }
  );

  footer(s, "01 — The brief");
}

// =====================================================================
// SLIDE 3 — What shipped (big stat callouts)
// =====================================================================
{
  const s = pres.addSlide();
  lightBg(s);

  s.addText("What shipped", {
    x: 0.7, y: 0.5, w: 8, h: 0.7,
    fontFace: "Calibri Light", fontSize: 36, bold: true, color: INK,
  });
  s.addText("Tellix 1.0.0 — fully working, publicly released.", {
    x: 0.7, y: 1.2, w: 10, h: 0.4,
    fontFace: "Calibri Light", fontSize: 14, color: SLATE,
  });

  // Four stat cards
  const stats = [
    { value: "~1,500", label: "lines of Python\nacross 5 focused modules", color: TEAL },
    { value: "1.0.0", label: "released on GitHub\nwith CI/CD pipeline", color: CYAN },
    { value: "~250 MB", label: "single portable .exe\nno Python required", color: EMERALD },
    { value: "100%", label: "local + offline\nzero cloud calls", color: AMBER },
  ];
  const startX = 0.7;
  const cardW = 2.9;
  const gap = 0.2;
  stats.forEach((stat, i) => {
    const x = startX + i * (cardW + gap);
    card(s, x, 2.1, cardW, 2.8, stat.color);
    s.addText(stat.value, {
      x: x + 0.2, y: 2.35, w: cardW - 0.3, h: 1.4,
      fontFace: "Calibri Light", fontSize: 32, bold: true,
      color: stat.color, valign: "middle",
    });
    s.addText(stat.label, {
      x: x + 0.2, y: 3.75, w: cardW - 0.3, h: 1.0,
      fontFace: "Calibri", fontSize: 12, color: INK,
      valign: "top", lineSpacing: 16,
    });
  });

  // Below: the "headline features" pills
  s.addText("Headline features", {
    x: 0.7, y: 5.2, w: 6, h: 0.4,
    fontFace: "Calibri", fontSize: 16, bold: true, color: INK,
  });
  const features = [
    "Screen + mic recording",
    "System-audio capture (meetings)",
    "Live transcription",
    "Final-pass transcript",
    "Embedded subtitles in MP4",
    "Recovery script for old sessions",
  ];
  features.forEach((f, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    s.addShape("roundRect", {
      x: 0.7 + col * 4.1, y: 5.7 + row * 0.55, w: 4.0, h: 0.45,
      fill: { color: PAPER }, line: { color: HAIRLINE, width: 0.5 },
      rectRadius: 0.05,
    });
    s.addShape("ellipse", {
      x: 0.85 + col * 4.1, y: 5.83 + row * 0.55, w: 0.18, h: 0.18,
      fill: { color: TEAL }, line: { type: "none" },
    });
    s.addText(f, {
      x: 1.15 + col * 4.1, y: 5.7 + row * 0.55, w: 3.5, h: 0.45,
      fontFace: "Calibri", fontSize: 12, color: INK,
      valign: "middle",
    });
  });

  footer(s, "02 — What shipped");
}

// =====================================================================
// SLIDE 4 — The system (architecture)
// =====================================================================
{
  const s = pres.addSlide();
  lightBg(s);

  s.addText("The system", {
    x: 0.7, y: 0.5, w: 8, h: 0.7,
    fontFace: "Calibri Light", fontSize: 36, bold: true, color: INK,
  });
  s.addText("Four boxes. Every dependency justified. Nothing in the box that doesn't earn its place.", {
    x: 0.7, y: 1.2, w: 11, h: 0.4,
    fontFace: "Calibri Light", fontSize: 14, color: SLATE,
  });

  // Four pipeline boxes
  const boxes = [
    { title: "GUI",        tech: "Tkinter",                                  detail: "Single-screen controls,\nlive caption pane,\nstatus + progress" },
    { title: "Capture",    tech: "FFmpeg + sounddevice + soundcard",         detail: "Screen via gdigrab,\nmic via PortAudio,\nsystem via WASAPI loopback" },
    { title: "Transcribe", tech: "faster-whisper (CTranslate2)",             detail: "Live: rolling 5s + VAD\nFinal: full audio, beam=5,\nGPU optional" },
    { title: "Output",     tech: "FFmpeg mux",                               detail: "recording.mp4\n+ embedded SRT\n+ plain TXT" },
  ];
  const bx = 0.7, by = 2.1, bw = 2.95, bh = 3.4, bgap = 0.15;
  boxes.forEach((b, i) => {
    const x = bx + i * (bw + bgap);
    card(s, x, by, bw, bh, [TEAL, CYAN, EMERALD, AMBER][i]);
    s.addText(b.title, {
      x: x + 0.2, y: by + 0.2, w: bw - 0.3, h: 0.45,
      fontFace: "Calibri", fontSize: 18, bold: true, color: INK,
    });
    s.addText(b.tech, {
      x: x + 0.2, y: by + 0.7, w: bw - 0.3, h: 0.7,
      fontFace: "Calibri", fontSize: 11, italic: true,
      color: [TEAL, CYAN, EMERALD, AMBER][i],
    });
    s.addText(b.detail, {
      x: x + 0.2, y: by + 1.5, w: bw - 0.3, h: 1.7,
      fontFace: "Calibri", fontSize: 12, color: INK,
      lineSpacing: 18, valign: "top",
    });
    // Arrow to next box
    if (i < boxes.length - 1) {
      s.addShape("rightTriangle", {
        x: x + bw + 0.005, y: by + bh / 2 - 0.08, w: 0.13, h: 0.16,
        fill: { color: SLATE }, line: { type: "none" },
        rotate: 90,
      });
    }
  });

  // Bottom annotation
  s.addText("All four boxes run on the user's machine. No network calls except the one-time Whisper model download from HuggingFace.", {
    x: 0.7, y: 5.8, w: 12, h: 0.5,
    fontFace: "Calibri", fontSize: 13, color: SLATE, italic: true,
  });

  footer(s, "03 — Architecture");
}

// =====================================================================
// SLIDE 5 — Method: Plan first, then audit
// =====================================================================
{
  const s = pres.addSlide();
  lightBg(s);

  s.addText("Method: plan, then audit", {
    x: 0.7, y: 0.5, w: 10, h: 0.7,
    fontFace: "Calibri Light", fontSize: 36, bold: true, color: INK,
  });
  s.addText("Before writing code, write a plan — then deliberately attack it for gaps.", {
    x: 0.7, y: 1.2, w: 12, h: 0.4,
    fontFace: "Calibri Light", fontSize: 14, color: SLATE,
  });

  // Left: timeline of what happened
  card(s, 0.7, 2.0, 5.2, 4.5, TEAL);
  s.addText("How it played out", {
    x: 1.0, y: 2.15, w: 4.7, h: 0.4,
    fontFace: "Calibri", fontSize: 16, bold: true, color: TEAL,
  });
  const steps = [
    { n: "1", t: "Clarifying questions", d: "Platform, tech stack, transcription engine, key features — all pinned before scoping." },
    { n: "2", t: "Written plan", d: "Architecture, file layout, build order, trade-offs — committed to a doc first." },
    { n: "3", t: "Audit pass", d: "Re-read the plan looking for gaps. Found three real bugs before any code existed." },
    { n: "4", t: "Build, verify, iterate", d: "Walking skeleton first; each addition followed the same plan-audit-verify loop." },
  ];
  steps.forEach((step, i) => {
    const y = 2.65 + i * 0.85;
    s.addShape("ellipse", {
      x: 1.0, y: y, w: 0.35, h: 0.35,
      fill: { color: TEAL }, line: { type: "none" },
    });
    s.addText(step.n, {
      x: 1.0, y: y, w: 0.35, h: 0.35,
      fontFace: "Calibri", fontSize: 14, bold: true,
      color: PAPER, align: "center", valign: "middle",
    });
    s.addText(step.t, {
      x: 1.5, y: y - 0.05, w: 4.2, h: 0.3,
      fontFace: "Calibri", fontSize: 13, bold: true, color: INK,
    });
    s.addText(step.d, {
      x: 1.5, y: y + 0.22, w: 4.2, h: 0.55,
      fontFace: "Calibri Light", fontSize: 10.5, color: SLATE,
      lineSpacing: 13,
    });
  });

  // Right: the three gaps the audit caught (concrete!)
  card(s, 6.2, 2.0, 6.4, 4.5, CYAN);
  s.addText("3 critical bugs caught before code", {
    x: 6.5, y: 2.15, w: 5.9, h: 0.4,
    fontFace: "Calibri", fontSize: 16, bold: true, color: CYAN,
  });
  const gaps = [
    { t: "Audio device conflict",
      d: "Original plan had FFmpeg and sounddevice both grabbing the mic — Windows mic drivers usually allow only one client. Would have killed live transcription." },
    { t: "Wrong GPU detection",
      d: "Plan used torch.cuda.is_available(). But faster-whisper runs on CTranslate2, not PyTorch — that check would have pulled in a useless 2 GB dependency." },
    { t: "Misconceived dshow default",
      d: "Used audio=\"default\" in an FFmpeg dshow example. DirectShow has no \"default\" mic concept — devices must be enumerated by exact name." },
  ];
  gaps.forEach((g, i) => {
    const y = 2.65 + i * 1.15;
    s.addShape("rect", {
      x: 6.5, y: y, w: 0.05, h: 1.0,
      fill: { color: AMBER }, line: { type: "none" },
    });
    s.addText(g.t, {
      x: 6.65, y: y - 0.05, w: 5.85, h: 0.35,
      fontFace: "Calibri", fontSize: 13, bold: true, color: INK,
    });
    s.addText(g.d, {
      x: 6.65, y: y + 0.25, w: 5.85, h: 0.8,
      fontFace: "Calibri Light", fontSize: 11, color: SLATE,
      lineSpacing: 14,
    });
  });

  footer(s, "04 — Method I: plan + audit");
}

// =====================================================================
// SLIDE 6 — Method: verify everything
// =====================================================================
{
  const s = pres.addSlide();
  lightBg(s);

  s.addText("Method: verify every change", {
    x: 0.7, y: 0.5, w: 11, h: 0.7,
    fontFace: "Calibri Light", fontSize: 36, bold: true, color: INK,
  });
  s.addText("Every code edit ended with an explicit verification step. No \"looks right to me, ship it\".", {
    x: 0.7, y: 1.2, w: 12, h: 0.4,
    fontFace: "Calibri Light", fontSize: 14, color: SLATE,
  });

  // 4-stage process flow
  const stages = [
    { t: "py_compile", d: "Catch syntax errors\nin every module" },
    { t: "AST parse",  d: "Cross-check imports\nand top-level defs" },
    { t: "Stub tests", d: "Exercise helpers under\nfake sounddevice + whisper" },
    { t: "Manual E2E", d: "Run the .exe end-to-end\non real hardware" },
  ];
  const sx = 0.7, sy = 2.3, sw = 2.85, sh = 2.5, sgap = 0.25;
  stages.forEach((st, i) => {
    const x = sx + i * (sw + sgap);
    s.addShape("rect", {
      x: x, y: sy, w: sw, h: sh,
      fill: { color: PAPER }, line: { color: HAIRLINE, width: 0.5 },
    });
    // Big number
    s.addText(String(i + 1), {
      x: x + 0.2, y: sy + 0.2, w: 1.2, h: 1.2,
      fontFace: "Calibri Light", fontSize: 64, bold: true,
      color: [TEAL, CYAN, EMERALD, AMBER][i], valign: "top",
    });
    s.addText(st.t, {
      x: x + 0.2, y: sy + 1.35, w: sw - 0.4, h: 0.4,
      fontFace: "Calibri", fontSize: 16, bold: true, color: INK,
    });
    s.addText(st.d, {
      x: x + 0.2, y: sy + 1.75, w: sw - 0.4, h: 0.7,
      fontFace: "Calibri Light", fontSize: 12, color: SLATE,
      lineSpacing: 15,
    });
    if (i < stages.length - 1) {
      s.addShape("rightTriangle", {
        x: x + sw + 0.04, y: sy + sh / 2 - 0.08, w: 0.15, h: 0.16,
        fill: { color: SLATE }, line: { type: "none" }, rotate: 90,
      });
    }
  });

  // Callout below
  s.addShape("rect", {
    x: 0.7, y: 5.3, w: 0.07, h: 1.3,
    fill: { color: TEAL }, line: { type: "none" },
  });
  s.addText("Without verification, AI-generated code looks fine and silently fails. With verification at every step, every regression is caught in seconds — not hours.", {
    x: 0.95, y: 5.3, w: 11.5, h: 1.3,
    fontFace: "Calibri Light", fontSize: 17, italic: true, color: INK,
    lineSpacing: 26, valign: "middle",
  });

  footer(s, "05 — Method II: verify");
}

// =====================================================================
// SLIDE 7 — Reliability case 1: empirical correction
// =====================================================================
{
  const s = pres.addSlide();
  lightBg(s);

  s.addText("Case 1 — when assumptions are wrong", {
    x: 0.7, y: 0.5, w: 12, h: 0.7,
    fontFace: "Calibri Light", fontSize: 32, bold: true, color: INK,
  });
  s.addText("System-audio capture (Google Meet, Zoom). The library we picked didn't do what the docs implied.", {
    x: 0.7, y: 1.15, w: 12, h: 0.4,
    fontFace: "Calibri Light", fontSize: 14, color: SLATE,
  });

  // Three columns: Assumption → Reality → Fix
  const cols = [
    { tag: "ASSUMPTION", title: "sounddevice handles WASAPI loopback via WasapiSettings(loopback=True)", color: AMBER },
    { tag: "REALITY",    title: "No released sounddevice version accepts that kwarg. The loopback path simply doesn't exist in the binding.", color: AMBER },
    { tag: "FIX",        title: "Switched to the soundcard library, which exposes include_loopback=True explicitly. Two-line API swap.", color: EMERALD },
  ];
  const cx = 0.7, cy = 1.85, cw = 4.0, ch = 3.6, cgap = 0.15;
  cols.forEach((c, i) => {
    const x = cx + i * (cw + cgap);
    card(s, x, cy, cw, ch, c.color);
    s.addText(c.tag, {
      x: x + 0.25, y: cy + 0.2, w: cw - 0.4, h: 0.4,
      fontFace: "Calibri", fontSize: 12, bold: true,
      color: c.color, charSpacing: 4,
    });
    s.addText(c.title, {
      x: x + 0.25, y: cy + 0.7, w: cw - 0.4, h: ch - 0.9,
      fontFace: "Calibri Light", fontSize: 15, color: INK,
      lineSpacing: 21, valign: "top",
    });
    if (i < cols.length - 1) {
      s.addShape("rightTriangle", {
        x: x + cw + 0.005, y: cy + ch / 2 - 0.1, w: 0.12, h: 0.2,
        fill: { color: SLATE }, line: { type: "none" }, rotate: 90,
      });
    }
  });

  // Takeaway band
  s.addShape("rect", {
    x: 0.7, y: 5.75, w: 0.07, h: 1.0,
    fill: { color: CYAN }, line: { type: "none" },
  });
  s.addText("TAKEAWAY", {
    x: 0.95, y: 5.7, w: 4, h: 0.4,
    fontFace: "Calibri", fontSize: 13, bold: true,
    color: CYAN, charSpacing: 3,
  });
  s.addText("Probe the API empirically, then build. A 30-second feature test prevented a debugging session of unknown length downstream.", {
    x: 0.95, y: 6.05, w: 11.5, h: 0.8,
    fontFace: "Calibri Light", fontSize: 14, color: INK,
    lineSpacing: 18,
  });

  footer(s, "06 — Case 1: empirical correction");
}

// =====================================================================
// SLIDE 8 — Reliability case 2: graceful failure
// =====================================================================
{
  const s = pres.addSlide();
  lightBg(s);

  s.addText("Case 2 — graceful failure beats silent failure", {
    x: 0.7, y: 0.5, w: 12, h: 0.7,
    fontFace: "Calibri Light", fontSize: 30, bold: true, color: INK,
  });
  s.addText("Transcripts came out empty. The user's audio was clearly in the file. Whisper just rejected it.", {
    x: 0.7, y: 1.15, w: 12, h: 0.4,
    fontFace: "Calibri Light", fontSize: 14, color: SLATE,
  });

  // Left: root cause
  card(s, 0.7, 1.85, 6.0, 4.0, AMBER);
  s.addText("Root cause", {
    x: 1.0, y: 2.0, w: 5.5, h: 0.4,
    fontFace: "Calibri", fontSize: 16, bold: true, color: AMBER,
  });
  s.addText([
    { text: "Forced language=\"en\"\n", options: { fontFace: "Consolas", fontSize: 13, color: INK, bold: true } },
    { text: "Made Whisper give up on any voice it didn't tag English — including accented English.\n\n", options: { fontFace: "Calibri Light", fontSize: 12, color: SLATE } },
    { text: "vad_filter=True on final pass\n", options: { fontFace: "Consolas", fontSize: 13, color: INK, bold: true } },
    { text: "Silero VAD at default threshold dropped quiet speech entirely before Whisper saw it.\n\n", options: { fontFace: "Calibri Light", fontSize: 12, color: SLATE } },
    { text: "Empty .txt file\n", options: { fontFace: "Consolas", fontSize: 13, color: INK, bold: true } },
    { text: "Was indistinguishable from \"the script never ran\". No feedback for the user.", options: { fontFace: "Calibri Light", fontSize: 12, color: SLATE } },
  ], { x: 1.0, y: 2.45, w: 5.5, h: 3.3, valign: "top", lineSpacing: 16 });

  // Right: three fixes shipped together
  card(s, 6.9, 1.85, 5.7, 4.0, EMERALD);
  s.addText("Fixes shipped", {
    x: 7.2, y: 2.0, w: 5.2, h: 0.4,
    fontFace: "Calibri", fontSize: 16, bold: true, color: EMERALD,
  });
  const fixes = [
    { t: "Auto-detect language", d: "Removed the hardcoded 'en' on both passes." },
    { t: "VAD off for final pass", d: "Whisper's own no-speech detector handles silence." },
    { t: "Diagnostic empty message", d: "Empty transcript now reads: '(no speech detected — check mic.wav levels)'." },
    { t: "Recovery script", d: "retranscribe.py recovers transcripts from existing sessions, no re-recording." },
  ];
  fixes.forEach((f, i) => {
    const y = 2.5 + i * 0.7;
    // Bullet styled as a vertical accent bar. Bar height < row spacing
    // (0.55 vs 0.7) so the four bars read as four separate markers, not
    // as one continuous strip.
    s.addShape("rect", {
      x: 7.2, y: y + 0.02, w: 0.06, h: 0.55,
      fill: { color: EMERALD }, line: { type: "none" },
    });
    s.addText(f.t, {
      x: 7.4, y: y, w: 5.0, h: 0.3,
      fontFace: "Calibri", fontSize: 13, bold: true, color: INK,
    });
    s.addText(f.d, {
      x: 7.4, y: y + 0.3, w: 5.0, h: 0.5,
      fontFace: "Calibri Light", fontSize: 11, color: SLATE,
      lineSpacing: 14,
    });
  });

  // Takeaway
  s.addShape("rect", {
    x: 0.7, y: 6.0, w: 0.07, h: 0.8,
    fill: { color: CYAN }, line: { type: "none" },
  });
  s.addText("TAKEAWAY", {
    x: 0.95, y: 5.95, w: 4, h: 0.35,
    fontFace: "Calibri", fontSize: 13, bold: true, color: CYAN, charSpacing: 3,
  });
  s.addText("When something fails, the system should say what failed. Silent zero-byte files are debt; helpful error messages are an investment.", {
    x: 0.95, y: 6.25, w: 11.5, h: 0.7,
    fontFace: "Calibri Light", fontSize: 13, color: INK, lineSpacing: 17,
  });

  footer(s, "07 — Case 2: graceful failure");
}

// =====================================================================
// SLIDE 9 — Reliability case 3: defense in depth
// =====================================================================
{
  const s = pres.addSlide();
  lightBg(s);

  s.addText("Case 3 — plan for hardware you haven't seen", {
    x: 0.7, y: 0.5, w: 12, h: 0.7,
    fontFace: "Calibri Light", fontSize: 30, bold: true, color: INK,
  });
  s.addText("Tested on one laptop, worked perfectly. On a second laptop with an Intel Smart Sound mic — total failure.", {
    x: 0.7, y: 1.15, w: 12, h: 0.4,
    fontFace: "Calibri Light", fontSize: 14, color: SLATE,
  });

  // Left: the error
  card(s, 0.7, 1.85, 4.5, 4.5, AMBER);
  s.addText("The error", {
    x: 1.0, y: 2.0, w: 4.0, h: 0.4,
    fontFace: "Calibri", fontSize: 16, bold: true, color: AMBER,
  });
  s.addText("PaErrorCode -9999\n'Undefined external error'\n[MME error 1]", {
    x: 1.0, y: 2.5, w: 4.0, h: 1.3,
    fontFace: "Consolas", fontSize: 14, color: INK,
    lineSpacing: 21,
  });
  s.addText("Windows' legacy MME audio API refused our 16 kHz mono request — the driver wanted its native 48 kHz stereo. The first laptop's mic happened to accept conversion; the second one didn't.", {
    x: 1.0, y: 4.0, w: 4.0, h: 2.0,
    fontFace: "Calibri Light", fontSize: 11.5, color: SLATE,
    lineSpacing: 16, valign: "top",
  });

  // Right: 7-step fallback chain
  card(s, 5.4, 1.85, 7.2, 4.5, EMERALD);
  s.addText("The fallback chain", {
    x: 5.7, y: 2.0, w: 6.7, h: 0.4,
    fontFace: "Calibri", fontSize: 16, bold: true, color: EMERALD,
  });
  s.addText("AudioCapture.start() now tries up to 7 (device, rate, channels) combinations until one opens. The callback resamples whatever it gets to 16 kHz mono.", {
    x: 5.7, y: 2.4, w: 6.7, h: 0.7,
    fontFace: "Calibri Light", fontSize: 11.5, color: SLATE,
    lineSpacing: 15,
  });
  const attempts = [
    "User device, native rate, native channels",
    "User device, native rate, forced mono",
    "User device, 16 kHz, mono",
    "WASAPI default input, native rate",
    "WASAPI default input, native rate, stereo",
    "PortAudio default, 16 kHz",
    "PortAudio default, 44.1 / 48 kHz",
  ];
  attempts.forEach((a, i) => {
    const y = 3.2 + i * 0.42;
    s.addShape("rect", {
      x: 5.7, y: y + 0.08, w: 0.22, h: 0.22,
      fill: { color: EMERALD }, line: { type: "none" },
    });
    s.addText(String(i + 1), {
      x: 5.7, y: y + 0.08, w: 0.22, h: 0.22,
      fontFace: "Calibri", fontSize: 11, bold: true,
      color: PAPER, align: "center", valign: "middle",
    });
    s.addText(a, {
      x: 6.0, y: y, w: 6.4, h: 0.38,
      fontFace: "Calibri Light", fontSize: 12, color: INK,
      valign: "middle",
    });
  });

  // Takeaway
  s.addShape("rect", {
    x: 0.7, y: 6.45, w: 0.07, h: 0.55,
    fill: { color: CYAN }, line: { type: "none" },
  });
  s.addText("TAKEAWAY", {
    x: 0.95, y: 6.4, w: 4, h: 0.35,
    fontFace: "Calibri", fontSize: 13, bold: true,
    color: CYAN, charSpacing: 3,
  });
  s.addText("Code that works on one machine isn't reliable; code that survives 7 hardware variations begins to be.", {
    x: 0.95, y: 6.7, w: 12, h: 0.35,
    fontFace: "Calibri Light", fontSize: 13, color: INK,
    lineSpacing: 17,
  });

  footer(s, "08 — Case 3: defense in depth");
}

// =====================================================================
// SLIDE 10 — Beyond the code (production discipline)
// =====================================================================
{
  const s = pres.addSlide();
  lightBg(s);

  s.addText("Beyond the code", {
    x: 0.7, y: 0.5, w: 12, h: 0.7,
    fontFace: "Calibri Light", fontSize: 36, bold: true, color: INK,
  });
  s.addText("Reliable software is more than a working binary. Tellix ships as an open-source project, not a one-off.", {
    x: 0.7, y: 1.2, w: 12, h: 0.4,
    fontFace: "Calibri Light", fontSize: 14, color: SLATE,
  });

  // 2x3 grid of "production polish" items
  const items = [
    { t: "MIT License",            d: "Clean, permissive. Distribution rights spelled out." },
    { t: "NOTICE.md",              d: "Every third-party dep + license, with links." },
    { t: "FFmpeg licensing note",  d: "Explicit LGPL vs GPL guidance for forkers." },
    { t: ".gitignore + .github",   d: "Clean repo. Nothing personal in commits." },
    { t: "GitHub Actions CI/CD",   d: "Tag a version → .exe builds itself, attaches to release." },
    { t: "HELP.md + RELEASE.md",   d: "User guide + release notes. Also rendered as PDFs for non-technical users." },
  ];
  const gx = 0.7, gy = 2.1, gw = 4.0, gh = 1.95, gxgap = 0.15, gygap = 0.15;
  items.forEach((it, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = gx + col * (gw + gxgap);
    const y = gy + row * (gh + gygap);
    const colColor = [TEAL, CYAN, EMERALD][col];
    s.addShape("rect", {
      x: x, y: y, w: gw, h: gh,
      fill: { color: PAPER }, line: { color: HAIRLINE, width: 0.5 },
    });
    s.addShape("rect", {
      x: x, y: y, w: gw, h: 0.07,
      fill: { color: colColor }, line: { type: "none" },
    });
    s.addText(it.t, {
      x: x + 0.25, y: y + 0.25, w: gw - 0.4, h: 0.5,
      fontFace: "Calibri", fontSize: 16, bold: true, color: INK,
    });
    s.addText(it.d, {
      x: x + 0.25, y: y + 0.8, w: gw - 0.4, h: gh - 1.0,
      fontFace: "Calibri Light", fontSize: 12, color: SLATE,
      lineSpacing: 17, valign: "top",
    });
  });

  // Bottom note
  s.addText("Every file is intentional. Anyone forking Tellix gets a project that's ready to extend, not a script that needs cleaning up first.", {
    x: 0.7, y: 6.4, w: 12.0, h: 0.5,
    fontFace: "Calibri Light", fontSize: 13, italic: true, color: INK,
  });

  footer(s, "09 — Production polish");
}

// =====================================================================
// SLIDE 11 — Takeaways
// =====================================================================
{
  const s = pres.addSlide();
  darkBg(s);

  s.addText("What this demonstrates", {
    x: 0.7, y: 0.6, w: 12, h: 0.8,
    fontFace: "Calibri Light", fontSize: 38, bold: true, color: PAPER,
  });
  s.addText("Four principles that turn AI-assisted coding into production-grade engineering.", {
    x: 0.7, y: 1.4, w: 12, h: 0.5,
    fontFace: "Calibri Light", fontSize: 16, color: "B6C2D2",
  });

  const principles = [
    { n: "01", color: TEAL,    t: "Plan and audit before code",
      d: "The biggest reliability wins came from re-reading the plan, not from clever code. Three real bugs caught before line one was written." },
    { n: "02", color: CYAN,    t: "Verify every change",
      d: "py_compile, AST, stub-based unit tests, manual E2E. AI generates plausible code easily; only verification distinguishes plausible from correct." },
    { n: "03", color: EMERALD, t: "Engineer for graceful failure",
      d: "Silent zero-byte files are debt. Diagnostic messages, fallback chains, recovery scripts — these compound into a product that survives the real world." },
    { n: "04", color: AMBER,   t: "Production polish is part of the product",
      d: "License, CI/CD, third-party attribution, distribution path. The .exe is one deliverable; the repo around it is another." },
  ];
  principles.forEach((p, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.7 + col * 6.2;
    const y = 2.3 + row * 2.3;
    // Card on dark
    s.addShape("rect", {
      x: x, y: y, w: 5.9, h: 2.1,
      fill: { color: NAVY_2 }, line: { color: "1B3050", width: 0.5 },
    });
    s.addShape("rect", {
      x: x, y: y, w: 0.07, h: 2.1,
      fill: { color: p.color }, line: { type: "none" },
    });
    s.addText(p.n, {
      x: x + 0.25, y: y + 0.15, w: 1.0, h: 0.45,
      fontFace: "Calibri", fontSize: 14, bold: true, color: p.color,
    });
    s.addText(p.t, {
      x: x + 0.25, y: y + 0.55, w: 5.5, h: 0.5,
      fontFace: "Calibri", fontSize: 18, bold: true, color: PAPER,
    });
    s.addText(p.d, {
      x: x + 0.25, y: y + 1.1, w: 5.5, h: 0.95,
      fontFace: "Calibri Light", fontSize: 12, color: "B6C2D2",
      lineSpacing: 17, valign: "top",
    });
  });
}

// =====================================================================
// SLIDE 12 — Closing
// =====================================================================
{
  const s = pres.addSlide();
  darkBg(s);

  // Big closing message
  s.addText("Tellix is live.", {
    x: 0.7, y: 1.5, w: 12, h: 1.2,
    fontFace: "Calibri Light", fontSize: 64, bold: true, color: PAPER,
  });
  s.addText("Built collaboratively with Claude — verified, hardened, documented, released.", {
    x: 0.7, y: 2.8, w: 12, h: 0.7,
    fontFace: "Calibri Light", fontSize: 22, color: "B6C2D2",
  });

  // Three resource blocks
  const links = [
    { tag: "REPO",     v: "github.com/victorjoe/tellix",                       color: TEAL },
    { tag: "RELEASE",  v: "Tellix 1.0.0 — single-file .exe, ~250 MB",          color: CYAN },
    { tag: "DOCS",     v: "HELP.md + RELEASE.md (PDF + Markdown)",             color: EMERALD },
  ];
  links.forEach((l, i) => {
    const y = 4.2 + i * 0.7;
    s.addShape("rect", {
      x: 0.7, y: y, w: 0.07, h: 0.5,
      fill: { color: l.color }, line: { type: "none" },
    });
    s.addText(l.tag, {
      x: 0.95, y: y, w: 1.5, h: 0.5,
      fontFace: "Calibri", fontSize: 13, bold: true, color: l.color,
      charSpacing: 3, valign: "middle",
    });
    s.addText(l.v, {
      x: 2.6, y: y, w: 10, h: 0.5,
      fontFace: "Calibri Light", fontSize: 17, color: PAPER,
      valign: "middle",
    });
  });

  // Q&A nudge
  s.addText("Questions?", {
    x: 0.7, y: 6.4, w: 12, h: 0.6,
    fontFace: "Calibri Light", fontSize: 22, italic: true, color: TEAL,
  });
}

// ---------- Save ----------
pres.writeFile({ fileName: "Tellix-Showcase.pptx" }).then(name => {
  console.log("Wrote", name);
});
