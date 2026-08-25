import { useEffect, useRef } from "react";
import { useLabStore } from "@/lib/qmk/store";
import { DELTA_ODOS, RCF_MIN } from "@/lib/qmk/physics";

type Mode = "chamber" | "fiber" | "lattice";

function readToken(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return v || fallback;
}

export function FieldCanvas({ mode }: { mode: Mode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pulse = useLabStore((s) => s.pulse);
  const lastResult = useLabStore((s) => s.lastResult);
  const rcf = useLabStore((s) => s.rcf);
  const deltaE = useLabStore((s) => s.deltaE);
  const lambda = useLabStore((s) => s.lambda);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t = 0;
    const pulseAt = { t: 0, n: pulse };

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      const bg = readToken("--color-bg", "#0c0c0e");
      const fg = readToken("--color-fg", "#eceae4");
      const muted = readToken("--color-muted", "#8e8c86");
      const resonance = readToken("--color-resonance", "#7a9e96");
      const veto = readToken("--color-veto", "#b07064");
      const border = "rgba(236,234,228,0.08)";

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h);

      ctx.strokeStyle = border;
      ctx.lineWidth = dpr;
      const step = 28 * dpr;
      ctx.beginPath();
      for (let x = 0; x <= w; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      const success = lastResult?.status === "MANIFESTATION_SUCCESS";
      const vetoed = lastResult && lastResult.status !== "MANIFESTATION_SUCCESS";
      const accent = vetoed ? veto : success ? resonance : muted;
      const phi = lastResult?.warpPhi ?? 0;
      const expand = 1 + phi * 0.9;
      const gateOpen = rcf >= RCF_MIN && deltaE <= DELTA_ODOS;

      if (pulse !== pulseAt.n) {
        pulseAt.n = pulse;
        pulseAt.t = t;
      }
      const sincePulse = t - pulseAt.t;

      if (mode === "lattice") {
        drawLattice(ctx, w, h, dpr, accent, fg, gateOpen, success, t, sincePulse, reduce);
      } else if (mode === "fiber") {
        drawFiber(ctx, cx, cy, scale, dpr, accent, fg, muted, expand, t, reduce, lambda);
      } else {
        drawChamber(ctx, cx, cy, scale, dpr, accent, fg, muted, expand, t, success, vetoed, sincePulse, reduce, rcf, deltaE);
      }

      if (!reduce) {
        t += 0.016;
        raf = requestAnimationFrame(draw);
      }
    };

    draw();
    if (reduce) {
      const onResize = () => draw();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
    return () => cancelAnimationFrame(raf);
  }, [mode, pulse, lastResult, rcf, deltaE, lambda]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      aria-hidden="true"
    />
  );
}

function drawChamber(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  dpr: number,
  accent: string,
  fg: string,
  muted: string,
  expand: number,
  t: number,
  success: boolean | 0 | undefined,
  vetoed: object | boolean | null | undefined,
  sincePulse: number,
  reduce: boolean,
  rcf: number,
  deltaE: number,
) {
  const r0 = scale * 0.14;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(reduce ? 0 : t * 0.08);
  ctx.strokeStyle = muted;
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 1.2 * dpr;
  roundedRect(ctx, -r0, -r0, r0 * 2, r0 * 2, 8 * dpr);
  ctx.stroke();
  ctx.restore();

  const rings = [
    { r: scale * 0.22 * expand, w: 1.2, speed: 0.35, label: "S¹" },
    { r: scale * 0.31 * expand, w: 1.0, speed: -0.22, label: "C" },
    { r: scale * 0.40 * expand, w: 0.9, speed: 0.14, label: "H" },
  ];

  rings.forEach((ring, i) => {
    ctx.beginPath();
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.35 + i * 0.12;
    ctx.lineWidth = ring.w * dpr;
    ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
    ctx.stroke();

    const dots = 3 + i * 2;
    for (let k = 0; k < dots; k++) {
      const a = (k / dots) * Math.PI * 2 + t * ring.speed;
      const x = cx + Math.cos(a) * ring.r;
      const y = cy + Math.sin(a) * ring.r;
      ctx.beginPath();
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = accent;
      ctx.arc(x, y, 2.2 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  if (success && sincePulse < 1.2) {
    const p = sincePulse / 1.2;
    ctx.beginPath();
    ctx.strokeStyle = accent;
    ctx.globalAlpha = (1 - p) * 0.5;
    ctx.lineWidth = 2 * dpr;
    ctx.arc(cx, cy, scale * 0.18 + p * scale * 0.28, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (vetoed) {
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1.4 * dpr;
    ctx.beginPath();
    ctx.moveTo(cx - scale * 0.12, cy - scale * 0.12);
    ctx.lineTo(cx + scale * 0.12, cy + scale * 0.12);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
  ctx.fillStyle = fg;
  ctx.font = `${11 * dpr}px "IBM Plex Mono", ui-monospace, monospace`;
  ctx.fillText(`RCF ${rcf.toFixed(4)}`, 12 * dpr, 20 * dpr);
  ctx.fillText(`ΔE  ${deltaE.toFixed(4)}`, 12 * dpr, 36 * dpr);
  ctx.fillText(`M₇ = M₄ × F₃`, 12 * dpr, ctx.canvas.height - 16 * dpr);
}

function drawFiber(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  dpr: number,
  accent: string,
  fg: string,
  muted: string,
  expand: number,
  t: number,
  reduce: boolean,
  lambda: number,
) {
  ctx.strokeStyle = muted;
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = dpr;
  ctx.beginPath();
  ctx.ellipse(cx, cy, scale * 0.38, scale * 0.16, 0.4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx, cy, scale * 0.38, scale * 0.16, -0.4, 0, Math.PI * 2);
  ctx.stroke();

  const fibers = 12;
  for (let i = 0; i < fibers; i++) {
    const a = (i / fibers) * Math.PI * 2 + t * 0.12;
    const rx = scale * 0.28 * expand;
    const ry = scale * 0.12 * expand;
    ctx.beginPath();
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.25 + 0.35 * ((Math.sin(a + t) + 1) / 2);
    ctx.lineWidth = 1.1 * dpr;
    ctx.ellipse(cx, cy, rx, ry, a, 0, Math.PI * 2);
    ctx.stroke();
  }

  for (let i = 0; i < 40; i++) {
    const u = i / 40 + t * 0.05;
    const a = u * Math.PI * 2;
    const x = cx + Math.cos(a) * scale * 0.22 * expand;
    const y = cy + Math.sin(a * 3) * scale * 0.08;
    ctx.beginPath();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.55;
    ctx.arc(x, y, 1.6 * dpr, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  ctx.fillStyle = fg;
  ctx.font = `${11 * dpr}px "IBM Plex Mono", ui-monospace, monospace`;
  ctx.fillText(`φ warp  e²φ = ${Math.exp(2 * (expand - 1) / 0.9).toFixed(3)}`, 12 * dpr, 20 * dpr);
  ctx.fillText(`Λ  ${lambda.toFixed(2)}`, 12 * dpr, 36 * dpr);
  ctx.fillText("F₃ = S¹_met × C_imm × H_neu", 12 * dpr, ctx.canvas.height - 16 * dpr);
}

function drawLattice(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  dpr: number,
  accent: string,
  fg: string,
  gateOpen: boolean,
  success: boolean | 0 | undefined,
  t: number,
  sincePulse: number,
  reduce: boolean,
) {
  const cols = 14;
  const rows = 9;
  const padX = 28 * dpr;
  const padY = 32 * dpr;
  const gw = (w - padX * 2) / (cols - 1);
  const gh = (h - padY * 2) / (rows - 1);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = padX + i * gw + (j % 2 === 0 ? 0 : gw * 0.18);
      const y = padY + j * gh;
      if (i < cols - 1) {
        ctx.beginPath();
        ctx.strokeStyle = accent;
        ctx.globalAlpha = gateOpen ? 0.28 : 0.12;
        ctx.lineWidth = dpr;
        ctx.moveTo(x, y);
        ctx.lineTo(padX + (i + 1) * gw + (j % 2 === 0 ? 0 : gw * 0.18), y);
        ctx.stroke();
      }
      if (j < rows - 1) {
        ctx.beginPath();
        ctx.strokeStyle = accent;
        ctx.globalAlpha = gateOpen ? 0.22 : 0.1;
        ctx.moveTo(x, y);
        ctx.lineTo(
          padX + i * gw + ((j + 1) % 2 === 0 ? 0 : gw * 0.18),
          padY + (j + 1) * gh,
        );
        ctx.stroke();
      }

      const wave = success && !reduce ? Math.sin(t * 4 - i * 0.4 - j * 0.3) : 0;
      const pulseRing = sincePulse < 1.4 ? Math.max(0, 1 - Math.abs((i + j) / 16 - sincePulse) * 3) : 0;
      ctx.beginPath();
      ctx.fillStyle = accent;
      ctx.globalAlpha = gateOpen ? 0.45 + wave * 0.2 + pulseRing * 0.4 : 0.18;
      ctx.arc(x, y, (1.8 + pulseRing * 1.4) * dpr, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
  ctx.fillStyle = fg;
  ctx.font = `${11 * dpr}px "IBM Plex Mono", ui-monospace, monospace`;
  ctx.fillText(gateOpen ? "ODOS-Gate · leitend  σ → σ_max" : "ODOS-Gate · ρ → ∞", 12 * dpr, 20 * dpr);
  ctx.fillText("Ag-DNA · Perowskit-Memristor", 12 * dpr, h - 16 * dpr);
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
