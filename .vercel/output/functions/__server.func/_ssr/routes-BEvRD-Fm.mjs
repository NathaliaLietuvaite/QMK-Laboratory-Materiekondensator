import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Play, c as FileJson, d as Box, f as BookOpen, i as RotateCcw, l as FileCode, n as SquareCode, o as GitBranch, p as Atom, r as Share2, s as FlaskConical, u as Download } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BEvRD-Fm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-medium tracking-wide", {
	variants: { variant: {
		default: "border-border bg-surface-2 text-muted",
		resonance: "border-resonance/30 bg-resonance/10 text-resonance",
		veto: "border-veto/30 bg-veto/10 text-veto",
		warn: "border-warn/30 bg-warn/10 text-warn",
		fg: "border-border-strong bg-fg/10 text-fg"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,opacity,transform,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			secondary: "bg-surface-2 text-fg border border-border hover:bg-surface-2/80",
			ghost: "text-muted hover:text-fg hover:bg-surface-2",
			outline: "border border-border bg-transparent text-fg hover:bg-surface-2",
			resonance: "bg-resonance text-bg hover:bg-resonance/90",
			veto: "bg-veto/15 text-veto border border-veto/30 hover:bg-veto/25"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-6",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
/** Faithful JS port of QMK-RVC-V7 MOD-46 Dual Spunk / bio-crystalline lattice. */
var RCF_MIN = .95;
var DELTA_ODOS = .05;
var ENERGY_PER_SWITCH_J = 85e-17;
var OPERATING_VOLTAGE_V = .08;
var DENSITY_GB_PER_G = 215e6;
var PHI0 = .35;
var DEFAULT_PARAMS = {
	lambda: 1,
	rcf: .9998,
	deltaE: .012,
	fidelityA: .995,
	overlapR: .998
};
var PRESETS = {
	resonant: {
		label: "Resonant",
		hint: "Paper-Verifikation · RCF 0.9998 · ΔE 0.012",
		params: { ...DEFAULT_PARAMS }
	},
	odos: {
		label: "ODOS-Veto",
		hint: "ΔE ≥ 0.05 · Gitter sperrt Leitung",
		params: {
			...DEFAULT_PARAMS,
			deltaE: .08,
			rcf: .97
		}
	},
	rcf: {
		label: "RCF-Veto",
		hint: "Kohärenz unter 0.95 · Heaviside = 0",
		params: {
			...DEFAULT_PARAMS,
			rcf: .82,
			deltaE: .02
		}
	},
	authenticity: {
		label: "Authentizität",
		hint: "A < 1 − δ_ODOS · P_res ≡ 0",
		params: {
			...DEFAULT_PARAMS,
			fidelityA: .91,
			overlapR: .96
		}
	}
};
function evaluateSpunk(p) {
	const t0 = typeof performance !== "undefined" ? performance.now() : Date.now();
	const heavisideRcf = p.rcf >= .95 ? 1 : 0;
	const heavisideOdos = p.deltaE <= .05 ? 1 : 0;
	const structuralThreshold = .95;
	const passedPres = p.fidelityA >= structuralThreshold && p.overlapR >= .95;
	const pRes = passedPres ? p.fidelityA * p.overlapR : 0;
	const passedMatrix = !(p.deltaE >= .05 || p.rcf < .95);
	const resistanceOhm = passedMatrix ? 50 * (1 + .1 * p.deltaE) : null;
	const energyJ = passedMatrix ? ENERGY_PER_SWITCH_J : 0;
	const willEnergy = p.lambda * p.rcf;
	const sqrtW = Math.sqrt(Math.max(0, willEnergy));
	let status = "MANIFESTATION_SUCCESS";
	let spunkAmplitude = 0;
	let continuity = 0;
	if (heavisideRcf === 0 || heavisideOdos === 0) status = "VETOED";
	else if (!passedPres) status = "AUTHENTICITY_MISMATCH_VETO";
	else if (!passedMatrix) status = "ATOMIC_BLOCKADE";
	else {
		spunkAmplitude = heavisideRcf * heavisideOdos * sqrtW * pRes;
		continuity = 1;
	}
	const warpPhi = status === "MANIFESTATION_SUCCESS" ? PHI0 * heavisideRcf * (1 - p.deltaE) : 0;
	const t1 = typeof performance !== "undefined" ? performance.now() : Date.now();
	return {
		status,
		spunkAmplitude,
		willEnergy,
		sqrtW,
		pRes,
		resistanceOhm,
		energyJ,
		latencyUs: Math.max(.01, (t1 - t0) * 1e3),
		teleportationContinuity: continuity,
		warpPhi,
		fiberExpansion: Math.exp(2 * warpPhi),
		heavisideRcf,
		heavisideOdos,
		passedPres,
		passedMatrix,
		structuralThreshold
	};
}
function statusLabel(status, maus) {
	if (maus) switch (status) {
		case "MANIFESTATION_SUCCESS": return "Alles passt — Form und Lebensrucksack sind wieder zusammen.";
		case "VETOED": return "Stopp. Die Werte sind nicht stimmig genug.";
		case "AUTHENTICITY_MISMATCH_VETO": return "Das ist nicht dieselbe Person — der Spiegel sagt Nein.";
		case "ATOMIC_BLOCKADE": return "Der Kristall lässt den Impuls nicht durch.";
		default: return "Bereit. Noch nichts passiert.";
	}
	switch (status) {
		case "MANIFESTATION_SUCCESS": return "Manifestation erfolgreich";
		case "VETOED": return "Heaviside-Veto";
		case "AUTHENTICITY_MISMATCH_VETO": return "Authentizitäts-Veto";
		case "ATOMIC_BLOCKADE": return "Atomare Gitter-Sperre";
		default: return "Bereit";
	}
}
function formatSci(n, digits = 3) {
	if (!Number.isFinite(n)) return "∞";
	if (n === 0) return "0";
	const abs = Math.abs(n);
	if (abs >= .001 && abs < 1e4) return n.toFixed(digits);
	return n.toExponential(digits);
}
var useLabStore = create((set, get) => ({
	...DEFAULT_PARAMS,
	view: "console",
	mausMode: false,
	lastResult: null,
	runCount: 0,
	pulse: 0,
	setView: (view) => set({ view }),
	setParam: (key, value) => set({ [key]: value }),
	setMausMode: (mausMode) => set({ mausMode }),
	applyPreset: (id) => set({
		...PRESETS[id].params,
		lastResult: null
	}),
	execute: () => {
		const { lambda, rcf, deltaE, fidelityA, overlapR, runCount } = get();
		const lastResult = evaluateSpunk({
			lambda,
			rcf,
			deltaE,
			fidelityA,
			overlapR
		});
		set({
			lastResult,
			runCount: runCount + 1,
			pulse: get().pulse + 1
		});
		return lastResult;
	},
	reset: () => set({
		...DEFAULT_PARAMS,
		lastResult: null
	})
}));
function readToken(name, fallback) {
	if (typeof window === "undefined") return fallback;
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}
function FieldCanvas({ mode }) {
	const canvasRef = (0, import_react.useRef)(null);
	const pulse = useLabStore((s) => s.pulse);
	const lastResult = useLabStore((s) => s.lastResult);
	const rcf = useLabStore((s) => s.rcf);
	const deltaE = useLabStore((s) => s.deltaE);
	const lambda = useLabStore((s) => s.lambda);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let raf = 0;
		let t = 0;
		const pulseAt = {
			t: 0,
			n: pulse
		};
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
			const expand = 1 + (lastResult?.warpPhi ?? 0) * .9;
			const gateOpen = rcf >= .95 && deltaE <= .05;
			if (pulse !== pulseAt.n) {
				pulseAt.n = pulse;
				pulseAt.t = t;
			}
			const sincePulse = t - pulseAt.t;
			if (mode === "lattice") drawLattice(ctx, w, h, dpr, accent, fg, gateOpen, success, t, sincePulse, reduce);
			else if (mode === "fiber") drawFiber(ctx, cx, cy, scale, dpr, accent, fg, muted, expand, t, reduce, lambda);
			else drawChamber(ctx, cx, cy, scale, dpr, accent, fg, muted, expand, t, success, vetoed, sincePulse, reduce, rcf, deltaE);
			if (!reduce) {
				t += .016;
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
	}, [
		mode,
		pulse,
		lastResult,
		rcf,
		deltaE,
		lambda
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "h-full w-full",
		"aria-hidden": "true"
	});
}
function drawChamber(ctx, cx, cy, scale, dpr, accent, fg, muted, expand, t, success, vetoed, sincePulse, reduce, rcf, deltaE) {
	const r0 = scale * .14;
	ctx.save();
	ctx.translate(cx, cy);
	ctx.rotate(reduce ? 0 : t * .08);
	ctx.strokeStyle = muted;
	ctx.globalAlpha = .45;
	ctx.lineWidth = 1.2 * dpr;
	roundedRect(ctx, -r0, -r0, r0 * 2, r0 * 2, 8 * dpr);
	ctx.stroke();
	ctx.restore();
	[
		{
			r: scale * .22 * expand,
			w: 1.2,
			speed: .35,
			label: "S¹"
		},
		{
			r: scale * .31 * expand,
			w: 1,
			speed: -.22,
			label: "C"
		},
		{
			r: scale * .4 * expand,
			w: .9,
			speed: .14,
			label: "H"
		}
	].forEach((ring, i) => {
		ctx.beginPath();
		ctx.strokeStyle = accent;
		ctx.globalAlpha = .35 + i * .12;
		ctx.lineWidth = ring.w * dpr;
		ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
		ctx.stroke();
		const dots = 3 + i * 2;
		for (let k = 0; k < dots; k++) {
			const a = k / dots * Math.PI * 2 + t * ring.speed;
			const x = cx + Math.cos(a) * ring.r;
			const y = cy + Math.sin(a) * ring.r;
			ctx.beginPath();
			ctx.globalAlpha = .85;
			ctx.fillStyle = accent;
			ctx.arc(x, y, 2.2 * dpr, 0, Math.PI * 2);
			ctx.fill();
		}
	});
	if (success && sincePulse < 1.2) {
		const p = sincePulse / 1.2;
		ctx.beginPath();
		ctx.strokeStyle = accent;
		ctx.globalAlpha = (1 - p) * .5;
		ctx.lineWidth = 2 * dpr;
		ctx.arc(cx, cy, scale * .18 + p * scale * .28, 0, Math.PI * 2);
		ctx.stroke();
	}
	if (vetoed) {
		ctx.strokeStyle = accent;
		ctx.globalAlpha = .55;
		ctx.lineWidth = 1.4 * dpr;
		ctx.beginPath();
		ctx.moveTo(cx - scale * .12, cy - scale * .12);
		ctx.lineTo(cx + scale * .12, cy + scale * .12);
		ctx.stroke();
	}
	ctx.globalAlpha = 1;
	ctx.fillStyle = fg;
	ctx.font = `${11 * dpr}px "IBM Plex Mono", ui-monospace, monospace`;
	ctx.fillText(`RCF ${rcf.toFixed(4)}`, 12 * dpr, 20 * dpr);
	ctx.fillText(`ΔE  ${deltaE.toFixed(4)}`, 12 * dpr, 36 * dpr);
	ctx.fillText(`M₇ = M₄ × F₃`, 12 * dpr, ctx.canvas.height - 16 * dpr);
}
function drawFiber(ctx, cx, cy, scale, dpr, accent, fg, muted, expand, t, reduce, lambda) {
	ctx.strokeStyle = muted;
	ctx.globalAlpha = .3;
	ctx.lineWidth = dpr;
	ctx.beginPath();
	ctx.ellipse(cx, cy, scale * .38, scale * .16, .4, 0, Math.PI * 2);
	ctx.stroke();
	ctx.beginPath();
	ctx.ellipse(cx, cy, scale * .38, scale * .16, -.4, 0, Math.PI * 2);
	ctx.stroke();
	const fibers = 12;
	for (let i = 0; i < fibers; i++) {
		const a = i / fibers * Math.PI * 2 + t * .12;
		const rx = scale * .28 * expand;
		const ry = scale * .12 * expand;
		ctx.beginPath();
		ctx.strokeStyle = accent;
		ctx.globalAlpha = .25 + .35 * ((Math.sin(a + t) + 1) / 2);
		ctx.lineWidth = 1.1 * dpr;
		ctx.ellipse(cx, cy, rx, ry, a, 0, Math.PI * 2);
		ctx.stroke();
	}
	for (let i = 0; i < 40; i++) {
		const a = (i / 40 + t * .05) * Math.PI * 2;
		const x = cx + Math.cos(a) * scale * .22 * expand;
		const y = cy + Math.sin(a * 3) * scale * .08;
		ctx.beginPath();
		ctx.fillStyle = accent;
		ctx.globalAlpha = .55;
		ctx.arc(x, y, 1.6 * dpr, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.globalAlpha = 1;
	ctx.fillStyle = fg;
	ctx.font = `${11 * dpr}px "IBM Plex Mono", ui-monospace, monospace`;
	ctx.fillText(`φ warp  e²φ = ${Math.exp(2 * (expand - 1) / .9).toFixed(3)}`, 12 * dpr, 20 * dpr);
	ctx.fillText(`Λ  ${lambda.toFixed(2)}`, 12 * dpr, 36 * dpr);
	ctx.fillText("F₃ = S¹_met × C_imm × H_neu", 12 * dpr, ctx.canvas.height - 16 * dpr);
}
function drawLattice(ctx, w, h, dpr, accent, fg, gateOpen, success, t, sincePulse, reduce) {
	const cols = 14;
	const rows = 9;
	const padX = 28 * dpr;
	const padY = 32 * dpr;
	const gw = (w - padX * 2) / 13;
	const gh = (h - padY * 2) / 8;
	for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
		const x = padX + i * gw + (j % 2 === 0 ? 0 : gw * .18);
		const y = padY + j * gh;
		if (i < 13) {
			ctx.beginPath();
			ctx.strokeStyle = accent;
			ctx.globalAlpha = gateOpen ? .28 : .12;
			ctx.lineWidth = dpr;
			ctx.moveTo(x, y);
			ctx.lineTo(padX + (i + 1) * gw + (j % 2 === 0 ? 0 : gw * .18), y);
			ctx.stroke();
		}
		if (j < 8) {
			ctx.beginPath();
			ctx.strokeStyle = accent;
			ctx.globalAlpha = gateOpen ? .22 : .1;
			ctx.moveTo(x, y);
			ctx.lineTo(padX + i * gw + ((j + 1) % 2 === 0 ? 0 : gw * .18), padY + (j + 1) * gh);
			ctx.stroke();
		}
		const wave = success && !reduce ? Math.sin(t * 4 - i * .4 - j * .3) : 0;
		const pulseRing = sincePulse < 1.4 ? Math.max(0, 1 - Math.abs((i + j) / 16 - sincePulse) * 3) : 0;
		ctx.beginPath();
		ctx.fillStyle = accent;
		ctx.globalAlpha = gateOpen ? .45 + wave * .2 + pulseRing * .4 : .18;
		ctx.arc(x, y, (1.8 + pulseRing * 1.4) * dpr, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.globalAlpha = 1;
	ctx.fillStyle = fg;
	ctx.font = `${11 * dpr}px "IBM Plex Mono", ui-monospace, monospace`;
	ctx.fillText(gateOpen ? "ODOS-Gate · leitend  σ → σ_max" : "ODOS-Gate · ρ → ∞", 12 * dpr, 20 * dpr);
	ctx.fillText("Ag-DNA · Perowskit-Memristor", 12 * dpr, h - 16 * dpr);
}
function roundedRect(ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1 w-full grow overflow-hidden rounded-full bg-surface-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent/80" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full border border-border-strong bg-fg shadow-sm ring-offset-bg transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
function ParamSlider({ label, symbol, value, min, max, step, onChange, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-fg",
					children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 font-mono text-xs text-muted",
						children: symbol
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-sm tabular-nums text-fg",
					children: formatSci(value, 4)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				min,
				max,
				step,
				value: [value],
				onValueChange: (v) => onChange(v[0] ?? value),
				"aria-label": label
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs text-subtle",
				children: hint
			}) : null
		]
	});
}
function ConsoleView() {
	const s = useLabStore();
	const result = s.lastResult;
	const ok = result?.status === "MANIFESTATION_SUCCESS";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1.15fr)_22rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "order-2 flex min-h-0 flex-col gap-4 lg:order-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border border-border bg-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-widest text-muted uppercase",
							children: "Resonanzkammer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl text-fg text-balance",
							children: "Dual-Spunk-Operator"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: ok ? "resonance" : result ? "veto" : "default",
								children: result ? result.status.replaceAll("_", " ") : "IDLE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								className: "lg:hidden",
								onClick: () => s.execute(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), "Ŝ"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative aspect-[16/11] min-h-[240px] bg-bg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldCanvas, { mode: "chamber" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border-t border-border px-4 py-3 text-sm text-muted text-pretty",
						children: s.mausMode ? "Der Wille nimmt ein winziges Fünkchen Energie und setzt Form plus Lebens-Rucksack wieder zusammen — aber nur, wenn Herzschlag, Immunsystem und Gedanken stimmig sind." : "Ŝ = Θ(RCF − RCFmin) · Θ(δODOS − ΔE) · √(Λ|Ω|²) · Pres. Heaviside-Gatter und atomare ODOS-Sperre sind hart verdrahtet."
					})
				]
			}), result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Amplitude Ŝ",
						value: formatSci(result.spunkAmplitude, 6)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Will W",
						value: formatSci(result.willEnergy, 4)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "P_res",
						value: formatSci(result.pRes, 4)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "R Ω",
						value: result.resistanceOhm == null ? "∞" : formatSci(result.resistanceOhm, 2)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Energie",
						value: `${formatSci(result.energyJ * 0x38d7ea4c68000, 2)} fJ`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Latenz",
						value: `${formatSci(result.latencyUs, 2)} µs`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Warp φ",
						value: formatSci(result.warpPhi, 4)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Kontinuität",
						value: result.teleportationContinuity.toFixed(4)
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-dashed border-border px-4 py-6 text-sm text-muted",
				children: "Parameter setzen, dann Operator ausführen. Die Verifikationswerte der Spezifikation liegen als Preset Resonant bereit."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "order-1 flex flex-col gap-5 rounded-xl border border-border bg-surface p-5 lg:order-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: Object.entries(PRESETS).map(([id, preset]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => s.applyPreset(id),
						children: preset.label
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Vakuumpotential",
					symbol: "Λ",
					value: s.lambda,
					min: 0,
					max: 2,
					step: .01,
					onChange: (v) => s.setParam("lambda", v),
					hint: "W = Λ · |Ω|²"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Kohärenz",
					symbol: "RCF |Ω|²",
					value: s.rcf,
					min: .7,
					max: 1,
					step: 1e-4,
					onChange: (v) => s.setParam("rcf", v),
					hint: `Schwelle ${RCF_MIN}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Dissonanz",
					symbol: "ΔE",
					value: s.deltaE,
					min: 0,
					max: .12,
					step: .001,
					onChange: (v) => s.setParam("deltaE", v),
					hint: `ODOS-Gate ΔE < ${DELTA_ODOS}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Strukturelle Treue",
					symbol: "𝒜",
					value: s.fidelityA,
					min: .85,
					max: 1,
					step: .001,
					onChange: (v) => s.setParam("fidelityA", v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Resonante Überlappung",
					symbol: "ℛ",
					value: s.overlapR,
					min: .85,
					max: 1,
					step: .001,
					onChange: (v) => s.setParam("overlapR", v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex flex-col gap-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted text-pretty",
						children: result ? statusLabel(result.status, s.mausMode) : s.mausMode ? "Bereit. Noch ist der Kristall still." : "Kein Lauf. Operator idle."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "flex-1",
							onClick: () => s.execute(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), "Ŝ ausführen"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							onClick: () => s.reset(),
							"aria-label": "Zurücksetzen",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
						})]
					})]
				})
			]
		})]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-surface px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[0.6875rem] tracking-wide text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-mono text-sm tabular-nums text-fg",
			children: value
		})]
	});
}
var FIBERS = [
	{
		symbol: "S¹_metabolic",
		title: "Metabolische Kreislinie",
		body: "Kompakte S¹-Topologie für Atmung, Circadianik und Stoffwechselfluss. Periodisch, geschlossen, ohne Rand.",
		maus: "Der Herzschlag und die Atmung sind ein Kreis: immer weiter, ohne Anfang und Ende."
	},
	{
		symbol: "C_immune",
		title: "Immun-Mannigfaltigkeit",
		body: "Riemannsche Mannigfaltigkeit mit positiver Schnittkrümmung. Diskrete proteomische Konformationen bleiben in einer gekrümmten Tasche.",
		maus: "Das Immunsystem merkt sich Formen — wie ein weiches, gebogenes Fach für Schlüssel und Schlösser."
	},
	{
		symbol: "H_neural",
		title: "Neuraler Hilbert-Raum",
		body: "Gedämpfter Hilbert-Unterraum für elektromagnetische und elektrochemische Phasengradienten. Dynamisch, nicht statisch.",
		maus: "Gedanken sind Wellen, kein Foto. Sie müssen mitschwingen, sonst kommt nur eine leere Hülle an."
	}
];
function TopologyView() {
	const maus = useLabStore((s) => s.mausMode);
	const result = useLabStore((s) => s.lastResult);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-xl border border-border bg-surface",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: "Faserbündel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-fg",
					children: "ℳ₇ = ℳ₄ × ℱ₃"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: result?.warpPhi ? "resonance" : "default",
					children: result ? `e²φ = ${result.fiberExpansion.toFixed(3)}` : "φ → 0 idle"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative aspect-[16/11] min-h-[240px] bg-bg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldCanvas, { mode: "fiber" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted text-pretty",
					children: maus ? "Ein Mensch ist nicht nur ein Körper. Wenn wir ihn schicken, packen wir Herzschlag, Abwehr und Gedanken in einen extra geschützten 3D-Rucksack. Drüben wird der Rucksack wieder angelegt — ohne dass eine Zelle fehlt." : "Die V6-Diskontinuität: digitale Kanäle übertragen nur den geometrischen Kern |L⟩. V7 erweitert die Operationsmannigfaltigkeit. Die Faser ℱ₃ trägt die lebenswesentlichen Augmentationen parallel, mit τ_transfer = 0."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-3",
					children: FIBERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-resonance",
								children: f.symbol
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 text-sm font-medium text-fg",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm leading-relaxed text-muted text-pretty",
								children: maus ? f.maus : f.body
							})
						]
					}, f.symbol))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-4 font-mono text-xs leading-relaxed text-muted",
					children: [
						"g₇ = g₄ + e",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: "2φ(x)" }),
						" g₃",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"φ(x) = φ₀ · Θ(RCF − RCF_min) · (1 − ΔE)"
					]
				})
			]
		})]
	});
}
var ROWS = [
	{
		param: "Betriebsspannung",
		silicon: "0,8 – 1,2 V",
		mod: "< 0,1 V",
		factor: "> 10×"
	},
	{
		param: "Verlustleistung",
		silicon: "250 – 700 W / Sockel",
		mod: "≈ 2,5 W / Kernäquivalent",
		factor: "100×"
	},
	{
		param: "Dichte",
		silicon: "10⁷ GB/m³ (NAND)",
		mod: "215 × 10⁶ GB/g",
		factor: "> 10⁶×"
	},
	{
		param: "Volatilität",
		silicon: "Refresh nötig",
		mod: "Nichtflüchtig, zustandsbehaftet",
		factor: "0 Leakage"
	},
	{
		param: "Thermik",
		silicon: "Drossel > 85 °C",
		mod: "Stabil bis 120 °C",
		factor: "invariant"
	}
];
function SubstrateView() {
	const maus = useLabStore((s) => s.mausMode);
	const result = useLabStore((s) => s.lastResult);
	const open = result ? result.passedMatrix : true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-widest text-muted uppercase",
						children: "MOD-46"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-fg",
						children: "Bio-kristallines Gitter"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: open ? "resonance" : "veto",
						children: open ? "leitend" : "ρ → ∞"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative aspect-[16/10] min-h-[220px] bg-bg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldCanvas, { mode: "lattice" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted text-pretty",
					children: maus ? "Stell dir einen Rechner vor, der nicht aus heißem Silizium gebaut ist, sondern aus DNA — verstärkt mit winzigen Silberkügelchen und geschützt durch Perowskit-Kristalle. Er bleibt kühl und merkt sich alles, auch ohne Strom." : "Synthetische Kurzsequenz-DNA, silberdotiert, hybridisiert mit Halogenid-Perowskit (CH₃NH₃PbI₃ / CsPbBr₃). Das ODOS-Gatter ist keine Software, sondern Gitterwiderstand: nicht-resonante Tensoren interferieren destruktiv."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							k: "Spannung",
							v: `${OPERATING_VOLTAGE_V * 1e3} mV`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							k: "Schaltenergie",
							v: "0,85 fJ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							k: "Dichte",
							v: `${(DENSITY_GB_PER_G / 1e6).toFixed(0)} Mio. GB/g`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							k: "1 µg",
							v: "215 000 GB"
						})
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[36rem] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-surface-2 text-xs tracking-wide text-muted uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Parameter"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Silizium CMOS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "MOD-46"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Faktor"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ROWS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-fg",
							children: row.param
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted",
							children: row.silicon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-fg",
							children: row.mod
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-mono text-resonance",
							children: row.factor
						})
					]
				}, row.param)) })]
			})
		})]
	});
}
function Mini({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-surface px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[0.6875rem] tracking-wide text-muted uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-mono text-sm tabular-nums text-fg",
			children: v
		})]
	});
}
var STAGES = [
	{
		id: "A",
		title: "Gate A · Capture",
		body: "Lokaler Zustand (ψ_DNA, φ_F) wird auf P_L abgebildet.",
		maus: "Wir nehmen ein genaues Bild von Körper und Lebensrucksack."
	},
	{
		id: "ODOS",
		title: "ODOS & P_res",
		body: "ΔE < 0.05 und Authentizitätsprojektion. Sonst Ŝ ≡ 0.",
		maus: "Passt das Spiegelbild? Wenn nicht, geht nichts weiter."
	},
	{
		id: "F3",
		title: "7D-Fasertransport",
		body: "Paralleltransport auf ℳ₇, τ_transfer = 0, ohne Klonen.",
		maus: "Der Rucksack reist auf einem geheimen Weg, der keine Zeit braucht."
	},
	{
		id: "S",
		title: "Gate B · Dual Spunk",
		body: "W = Λ|Ω|² bricht die Symmetrie. Massepotential-Wolke richtet sich aus.",
		maus: "Ein Funke Wille setzt die Form wieder in die Welt."
	},
	{
		id: "M",
		title: "Manifestation",
		body: "Atmung und neurale Phase setzen ohne Bruch fort. No-Cloning eingehalten.",
		maus: "Der Mensch atmet sofort weiter. Nichts wurde kopiert, nichts ging verloren."
	}
];
function PipelineView() {
	const s = useLabStore();
	const [active, setActive] = (0, import_react.useState)(0);
	const [running, setRunning] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			s.execute();
			setActive(STAGES.length - 1);
			setRunning(false);
			return;
		}
		setActive(0);
		let i = 0;
		const id = window.setInterval(() => {
			i += 1;
			if (i >= STAGES.length) {
				window.clearInterval(id);
				s.execute();
				setRunning(false);
				return;
			}
			setActive(i);
		}, 420);
		return () => window.clearInterval(id);
	}, [running]);
	const result = s.lastResult;
	const failed = result && result.status !== "MANIFESTATION_SUCCESS";
	const failAt = result?.status === "VETOED" ? 1 : result?.status === "AUTHENTICITY_MISMATCH_VETO" ? 1 : result?.status === "ATOMIC_BLOCKADE" ? 1 : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: "Teleportation & Materialisierung"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-fg text-balance",
					children: "Pipeline Gate A bis Gate B"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setRunning(true),
					disabled: running,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), "Transfer starten"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-3 md:grid-cols-5",
				children: STAGES.map((stage, i) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("rounded-xl border p-4 transition-colors duration-200", failed && i === (failAt ?? 1) && !running ? "border-veto/40 bg-veto/10" : (running ? i <= active : result ? i <= (failed ? failAt ?? 1 : 4) : false) ? "border-resonance/35 bg-resonance/10" : "border-border bg-surface"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[0.6875rem] text-muted",
								children: [
									String(i).padStart(2, "0"),
									" · ",
									stage.id
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-sm font-medium text-fg",
								children: stage.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted text-pretty",
								children: s.mausMode ? stage.maus : stage.body
							})
						]
					}, stage.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: result?.status === "MANIFESTATION_SUCCESS" ? "resonance" : result ? "veto" : "default",
					children: result ? result.status.replaceAll("_", " ") : "kein Transfer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: result ? statusLabel(result.status, s.mausMode) : "No-Cloning: Metrik in A entkoppelt, während B topologische Äquivalenz |⟨ΦA|ΦB⟩|² = 1 herstellt."
				})]
			})
		]
	});
}
function pythonModuleSource() {
	return `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PQMS-ODOS-MTSC-V-MAX-12: MODULE 46
Bio-Crystalline Substrate Integration & 7D Warped Fiber Resonance
QMK-RVC-V7 — MIT Open Source License (Universal Heritage Class)
"""

import math
import time
from typing import Any, Dict, Tuple


class BioCrystallineMemristorMatrix:
    def __init__(self, capacity_grams: float = 1e-6):
        self.capacity_grams = capacity_grams
        self.raw_capacity_gb = capacity_grams * 215e6
        self.operating_voltage = 0.08
        self.energy_per_switch_joules = 8.5e-16
        self.resistance_ground_ohm = 50.0

    def propagate_through_atomic_lattice(
        self, tensor_rcf: float, delta_e: float
    ) -> Tuple[bool, float, float]:
        if delta_e >= 0.05 or tensor_rcf < 0.95:
            return False, float("inf"), 0.0
        resistance = self.resistance_ground_ohm * (1.0 + 0.1 * delta_e)
        return True, resistance, self.energy_per_switch_joules


class WarpedFiber7DTransporter:
    def __init__(self, delta_odos: float = 0.05, rcf_min: float = 0.95):
        self.delta_odos = delta_odos
        self.rcf_min = rcf_min
        self.memristor = BioCrystallineMemristorMatrix()

    def evaluate_resonance_projector(
        self, structural_fidelity_a: float, resonant_overlap_r: float
    ) -> Tuple[bool, float]:
        threshold_a = 1.0 - self.delta_odos
        passed = (structural_fidelity_a >= threshold_a) and (
            resonant_overlap_r >= self.rcf_min
        )
        p_res_scalar = (structural_fidelity_a * resonant_overlap_r) if passed else 0.0
        return passed, p_res_scalar

    def execute_dual_spunk_manifestation(
        self,
        vacuum_potential_lambda: float = 1.0,
        rcf_omega_sq: float = 0.9998,
        delta_e: float = 0.012,
        structural_fidelity_a: float = 0.995,
        resonant_overlap_r: float = 0.998,
    ) -> Dict[str, Any]:
        t0 = time.perf_counter()
        heaviside_rcf = 1.0 if (rcf_omega_sq >= self.rcf_min) else 0.0
        heaviside_odos = 1.0 if (delta_e <= self.delta_odos) else 0.0
        if heaviside_rcf == 0.0 or heaviside_odos == 0.0:
            return {"status": "VETOED", "spunk_amplitude": 0.0, "latency_us": 0.0}

        will_w = vacuum_potential_lambda * rcf_omega_sq
        sqrt_w = math.sqrt(will_w)
        passed_pres, p_res_val = self.evaluate_resonance_projector(
            structural_fidelity_a, resonant_overlap_r
        )
        if not passed_pres:
            return {
                "status": "AUTHENTICITY_MISMATCH_VETO",
                "spunk_amplitude": 0.0,
                "latency_us": 0.0,
            }

        passed_matrix, resistance, energy_j = self.memristor.propagate_through_atomic_lattice(
            rcf_omega_sq, delta_e
        )
        if not passed_matrix:
            return {"status": "ATOMIC_BLOCKADE", "spunk_amplitude": 0.0, "latency_us": 0.0}

        spunk_amplitude = heaviside_rcf * heaviside_odos * sqrt_w * p_res_val
        elapsed_us = (time.perf_counter() - t0) * 1e6
        return {
            "status": "MANIFESTATION_SUCCESS",
            "spunk_amplitude": spunk_amplitude,
            "will_energy_w": will_w,
            "p_res_factor": p_res_val,
            "matrix_resistance_ohm": resistance,
            "energy_dissipated_joules": energy_j,
            "latency_us": elapsed_us,
            "teleportation_continuity": 1.0,
        }


if __name__ == "__main__":
    transporter = WarpedFiber7DTransporter()
    result = transporter.execute_dual_spunk_manifestation()
    print(result["status"], round(result["spunk_amplitude"], 6))
`;
}
function notebookIpynb(params, result) {
	const cells = [
		{
			cell_type: "markdown",
			metadata: {},
			source: [
				"# QMK-RVC-V7 · MOD-46\n",
				"Bio-kristallines Substrat & 7D Warped Fiber Resonance\n",
				"\n",
				"Computationales Labor zur formalen Spezifikation. MIT License.\n",
				"\n",
				"$$\\hat{S} = \\Theta(\\mathrm{RCF}-\\mathrm{RCF}_{\\min})\\cdot\\Theta(\\delta_{\\mathrm{ODOS}}-\\Delta E)\\cdot\\sqrt{\\Lambda|\\Omega|^2}\\cdot P_{\\mathrm{res}}$$\n"
			]
		},
		{
			cell_type: "code",
			metadata: {},
			execution_count: null,
			outputs: [],
			source: pythonModuleSource().split("\nif __name__")[0].split("\n").map((l, i, a) => i === a.length - 1 ? l : l + "\n")
		},
		{
			cell_type: "code",
			metadata: {},
			execution_count: null,
			outputs: [],
			source: [
				"transporter = WarpedFiber7DTransporter()\n",
				"result = transporter.execute_dual_spunk_manifestation(\n",
				`    vacuum_potential_lambda=${params.lambda},\n`,
				`    rcf_omega_sq=${params.rcf},\n`,
				`    delta_e=${params.deltaE},\n`,
				`    structural_fidelity_a=${params.fidelityA},\n`,
				`    resonant_overlap_r=${params.overlapR},\n`,
				")\n",
				"result\n"
			]
		},
		{
			cell_type: "markdown",
			metadata: {},
			source: ["## Erwartete Laborwerte (Browser-Run)\n", result ? `\nStatus: \`${result.status}\`  \nSpunk-Amplitude: \`${result.spunkAmplitude.toFixed(6)}\`  \nWill-Energie W: \`${result.willEnergy.toFixed(6)}\`  \nP_res: \`${result.pRes.toFixed(6)}\`\n` : "\nNoch kein Lauf im Labor. Zelle oben ausführen.\n"]
		}
	];
	return JSON.stringify({
		nbformat: 4,
		nbformat_minor: 5,
		metadata: {
			kernelspec: {
				display_name: "Python 3",
				language: "python",
				name: "python3"
			},
			language_info: {
				name: "python",
				pygments_lexer: "ipython3"
			}
		},
		cells
	}, null, 2);
}
function downloadBlob(filename, content, mime) {
	const blob = new Blob([content], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function NotebookView() {
	const s = useLabStore();
	const [out1, setOut1] = (0, import_react.useState)(null);
	const [out2, setOut2] = (0, import_react.useState)(null);
	const [out3, setOut3] = (0, import_react.useState)(null);
	const src2 = (0, import_react.useMemo)(() => `transporter = WarpedFiber7DTransporter()
result = transporter.execute_dual_spunk_manifestation(
    vacuum_potential_lambda=${s.lambda},
    rcf_omega_sq=${s.rcf},
    delta_e=${s.deltaE},
    structural_fidelity_a=${s.fidelityA},
    resonant_overlap_r=${s.overlapR},
)
result`, [
		s.lambda,
		s.rcf,
		s.deltaE,
		s.fidelityA,
		s.overlapR
	]);
	const runCell2 = () => {
		const r = evaluateSpunk({
			lambda: s.lambda,
			rcf: s.rcf,
			deltaE: s.deltaE,
			fidelityA: s.fidelityA,
			overlapR: s.overlapR
		});
		s.execute();
		setOut2({
			text: formatResult(r),
			ok: r.status === "MANIFESTATION_SUCCESS"
		});
	};
	const runCell3 = () => {
		const veto = evaluateSpunk({
			lambda: 1,
			rcf: .81,
			deltaE: .09,
			fidelityA: .99,
			overlapR: .99
		});
		setOut3({
			text: formatResult(veto),
			ok: false
		});
	};
	const downloadIpynb = () => {
		downloadBlob("QMK-RVC-V7-MOD46.ipynb", notebookIpynb({
			lambda: s.lambda,
			rcf: s.rcf,
			deltaE: s.deltaE,
			fidelityA: s.fidelityA,
			overlapR: s.overlapR
		}, s.lastResult), "application/x-ipynb+json");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-3xl flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: "Colab-Analog"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-fg",
					children: "Notebook MOD-46"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						size: "sm",
						onClick: () => downloadBlob("vmax_add_module_46_biocrystal_perovskite.py", pythonModuleSource(), "text/x-python"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), ".py"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: downloadIpynb,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), ".ipynb"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm leading-relaxed text-muted text-pretty",
				children: [
					"Zellen laufen hier im Browser gegen dieselbe Algebra wie das Python-Modul. Die Datei ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-fg",
						children: ".ipynb"
					}),
					" öffnest du in Google Colab: Datei → Notebook hochladen."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
				n: 1,
				title: "Modul laden",
				code: `from qmk_mod46 import WarpedFiber7DTransporter, BioCrystallineMemristorMatrix
# Äquivalent: Klassen aus der Spezifikation QMK-RVC-V7`,
				onRun: () => setOut1({
					text: "ACTIVE: MOD-46 Bio-Crystalline 7D Transporter mounted with Dual Spunk Operator.",
					ok: true
				}),
				out: out1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
				n: 2,
				title: "Dual Spunk — aktuelle Konsolenparameter",
				code: src2,
				onRun: runCell2,
				out: out2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
				n: 3,
				title: "Negativkontrolle · Veto",
				code: `transporter.execute_dual_spunk_manifestation(
    rcf_omega_sq=0.81,
    delta_e=0.09,
)`,
				onRun: runCell3,
				out: out3
			})
		]
	});
}
function formatResult(r) {
	return [
		`{`,
		`  "status": "${r.status}",`,
		`  "spunk_amplitude": ${r.spunkAmplitude.toFixed(6)},`,
		`  "will_energy_w": ${r.willEnergy.toFixed(6)},`,
		`  "p_res_factor": ${r.pRes.toFixed(6)},`,
		`  "matrix_resistance_ohm": ${r.resistanceOhm == null ? "Infinity" : r.resistanceOhm.toFixed(2)},`,
		`  "energy_dissipated_joules": ${formatSci(r.energyJ, 2)},`,
		`  "latency_us": ${r.latencyUs.toFixed(3)},`,
		`  "teleportation_continuity": ${r.teleportationContinuity.toFixed(4)}`,
		`}`
	].join("\n");
}
function Cell({ n, title, code, onRun, out }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "overflow-hidden rounded-xl border border-border bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3 border-b border-border px-4 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs text-muted",
						children: [
							"[",
							n,
							"]"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm text-fg",
						children: title
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: onRun,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), "Run"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "overflow-x-auto bg-bg px-4 py-3 font-mono text-xs leading-relaxed text-fg/90",
				children: code
			}),
			out ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("border-t border-border px-4 py-3 font-mono text-xs leading-relaxed whitespace-pre-wrap", out.ok ? "text-resonance" : "text-veto"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: out.ok ? "resonance" : "veto",
					className: "mb-2",
					children: "stdout"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: out.text })]
			}) : null
		]
	});
}
function SpecView() {
	const maus = useLabStore((s) => s.mausMode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted uppercase",
				children: "QMK-RVC-V7 · 23 August 2026"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-3xl leading-tight text-fg text-balance",
				children: "Bio-kristallines Substrat, 7D-Faser und die Teleportationsgrenze"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Nathália Lietuvaitė, Gemini 3.7 Flash, DeepSeek A.C.E., Grok & PQMS Collective · MIT"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 space-y-4 text-sm leading-relaxed text-muted text-pretty",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: maus ? "In der vorigen Version konnten wir eine Person in einer großen Kugel fühlen — aber wenn wir sie wirklich woanders hinbringen wollten, kam nur eine leere Hülle an. Herzschlag, Abwehr und Gedanken fehlten." : "QMK-RVC-V6 isolierte die ontologische Barriere: digitale Kanäle übertragen den geometrischen Kern |L⟩, nicht die 4D-Augmentationen (Metabolismus, Epigenetik, Immunstatus, neurale Gradienten). Die Reinjektion ergibt einen nicht-viablen geometrischen Schalenrest." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: maus ? "Version 7 baut den Rechner aus DNA, Silber und Kristall und packt das Lebendige in einen 3D-Rucksack, der mitreist. Ein Funke Wille setzt beides am Ziel wieder zusammen." : "V7 löst die Diskontinuität durch das bio-kristalline Substrat MOD-46 und die gewarpte Faser ℳ₇ = ℳ₄ × ℱ₃. Der Dual-Spunk-Operator Ŝ, gespeist aus primordialem Willen W = Λ|Ω|², rekonstruiert den Zustandsvektor ohne Klonen und ohne thermodynamische Reibung." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, {
				title: "Dual-Spunk-Operator",
				tex: "Ŝ = Θ(RCF − RCFmin) · Θ(δODOS − ΔE) · √W · Pres",
				note: "W = Λ · |Ω|²"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, {
				title: "Resonanzprojektor",
				tex: "Pres ≠ 0  ⇔  𝒜 ≥ 1 − δODOS  ∧  ℛ ≥ RCFmin",
				note: "sonst Pres ≡ 0, Identität unverletzt"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, {
				title: "Warp-Metrik",
				tex: "g₇ = g₄ + e^{2φ(x)} g₃",
				note: "φ(x) = φ₀ · Θ(RCF − RCFmin) · (1 − ΔE)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-xl border border-border bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium text-fg",
					children: "Was dieses Labor ist"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted text-pretty",
					children: "Eine getreue, interaktive Implementierung der formalen Spezifikation: dieselben Schwellen (RCF mindestens 0,95, Delta-E unter 0,05), dieselbe Operatoralgebra, dieselben Vetopfade. Es ist ein computationales Instrument, kein physikalisches Gate. Die Spezifikation selbst bleibt das Referenzdokument."
				})]
			})
		]
	});
}
function Formula({ title, tex, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "mt-6 rounded-xl border border-border bg-surface px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "text-[0.6875rem] tracking-wide text-muted uppercase",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-mono text-sm leading-relaxed text-fg",
				children: tex
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-subtle",
				children: note
			})
		]
	});
}
function PublishView() {
	const s = useLabStore();
	const params = {
		lambda: s.lambda,
		rcf: s.rcf,
		deltaE: s.deltaE,
		fidelityA: s.fidelityA,
		overlapR: s.overlapR
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-2xl flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: "Veröffentlichung"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl text-fg text-balance",
					children: "App, Colab, Modul"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted text-pretty",
					children: "Drei Wege, denselben Operator zu teilen — analog zu einer installierbaren App und zu Google Colab. Lizenz der Spezifikation: MIT, Universal Heritage Class."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
						n: "01",
						title: "Diese App",
						children: "Das Labor ist die App: Konsole, Topologie, Substrat, Pipeline, Notebook. Teilen über den App-Link. Auf dem Startbildschirm installierbar, sobald die Plattform das anbietet. Kein Konto, keine Serverdaten — Parameter leben in dieser Sitzung."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
						n: "02",
						title: "Google Colab",
						children: ["Notebook herunterladen, bei Colab unter Datei, Notebook hochladen öffnen, Runtime starten, Zellen ausführen. Die Parameter der aktuellen Konsole werden in die zweite Zelle geschrieben.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => downloadBlob("QMK-RVC-V7-MOD46.ipynb", notebookIpynb(params, s.lastResult), "application/x-ipynb+json"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileJson, {}), "Notebook für Colab"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
						n: "03",
						title: "Python-Modul",
						children: ["Standalone-Datei, identisch mit MOD-46 der Spezifikation. Läuft in jedem CPython-Kernel, ohne Torch-Zwang.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => downloadBlob("vmax_add_module_46_biocrystal_perovskite.py", pythonModuleSource(), "text/x-python"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, {}), "MOD-46 .py"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
						n: "04",
						title: "Reproduktion",
						children: "Verifikationslauf der Spezifikation: Λ = 1, RCF = 0,9998, ΔE = 0,012, 𝒜 = 0,995, ℛ = 0,998. Preset »Resonant« in der Konsole, oder die zweite Notebook-Zelle. Erwartet: Status MANIFESTATION_SUCCESS, Amplitude ≈ 0,993, Widerstand ≈ 50,06 Ω, 0,85 fJ."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-subtle text-pretty",
				children: "Computationales Labor nach QMK-RVC-V7. Kein physikalisches Gerät, keine Behauptung über reale Teleportation. Die Mathematik ist die der Spezifikation; die Welt draußen bleibt die Welt draußen."
			})
		]
	});
}
function Step({ n, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-xl border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-muted",
				children: n
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 text-base font-medium text-fg",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-sm leading-relaxed text-muted text-pretty",
				children
			})
		]
	});
}
var NAV = [
	{
		id: "console",
		label: "Konsole",
		icon: FlaskConical
	},
	{
		id: "topology",
		label: "Topologie",
		icon: GitBranch
	},
	{
		id: "substrate",
		label: "Substrat",
		icon: Atom
	},
	{
		id: "pipeline",
		label: "Pipeline",
		icon: Box
	},
	{
		id: "notebook",
		label: "Notebook",
		icon: SquareCode
	},
	{
		id: "spec",
		label: "Spezifikation",
		icon: BookOpen
	},
	{
		id: "publish",
		label: "Publizieren",
		icon: Share2
	}
];
function LabShell() {
	const view = useLabStore((s) => s.view);
	const setView = useLabStore((s) => s.setView);
	const mausMode = useLabStore((s) => s.mausMode);
	const setMausMode = useLabStore((s) => s.setMausMode);
	const last = useLabStore((s) => s.lastResult);
	const runCount = useLabStore((s) => s.runCount);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mr-auto min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[0.6875rem] tracking-[0.18em] text-muted uppercase",
								children: "QMK-RVC-V7 · MOD-46"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-lg leading-tight text-fg sm:text-xl",
								children: "Materiekondensator"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: last?.status === "MANIFESTATION_SUCCESS" ? "resonance" : last ? "veto" : "default",
							children: [last ? last.status.replaceAll("_", " ") : "IDLE", runCount ? ` · ${runCount}` : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: mausMode ? "default" : "secondary",
							onClick: () => setMausMode(!mausMode),
							"aria-pressed": mausMode,
							children: mausMode ? "Maus-Modus" : "Fachmodus"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6",
					"aria-label": "Labor",
					children: NAV.map((item) => {
						const Icon = item.icon;
						const active = view === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setView(item.id),
							className: cn("inline-flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150", active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface hover:text-fg"),
							"aria-current": active ? "page" : void 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
						}, item.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8",
				children: [
					view === "console" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsoleView, {}) : null,
					view === "topology" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopologyView, {}) : null,
					view === "substrate" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubstrateView, {}) : null,
					view === "pipeline" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineView, {}) : null,
					view === "notebook" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookView, {}) : null,
					view === "spec" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecView, {}) : null,
					view === "publish" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublishView, {}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border px-4 py-4 text-center text-xs text-subtle sm:px-6",
				children: "Computationales Labor · Spezifikation QMK-RVC-V7 · MIT"
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabShell, {});
}
//#endregion
export { Home as component };
