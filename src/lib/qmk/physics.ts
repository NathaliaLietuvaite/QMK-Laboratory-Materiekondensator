/** Faithful JS port of QMK-RVC-V7 MOD-46 Dual Spunk / bio-crystalline lattice. */

export const RCF_MIN = 0.95;
export const DELTA_ODOS = 0.05;
export const RESISTANCE_GROUND_OHM = 50;
export const ENERGY_PER_SWITCH_J = 8.5e-16;
export const OPERATING_VOLTAGE_V = 0.08;
export const DENSITY_GB_PER_G = 215e6;
export const PHI0 = 0.35;

export type SpunkStatus =
  | "IDLE"
  | "MANIFESTATION_SUCCESS"
  | "VETOED"
  | "AUTHENTICITY_MISMATCH_VETO"
  | "ATOMIC_BLOCKADE";

export interface SpunkParams {
  lambda: number;
  rcf: number;
  deltaE: number;
  fidelityA: number;
  overlapR: number;
}

export interface SpunkResult {
  status: SpunkStatus;
  spunkAmplitude: number;
  willEnergy: number;
  sqrtW: number;
  pRes: number;
  resistanceOhm: number | null;
  energyJ: number;
  latencyUs: number;
  teleportationContinuity: number;
  warpPhi: number;
  fiberExpansion: number;
  heavisideRcf: number;
  heavisideOdos: number;
  passedPres: boolean;
  passedMatrix: boolean;
  structuralThreshold: number;
}

export const DEFAULT_PARAMS: SpunkParams = {
  lambda: 1.0,
  rcf: 0.9998,
  deltaE: 0.012,
  fidelityA: 0.995,
  overlapR: 0.998,
};

export const PRESETS: Record<
  string,
  { label: string; hint: string; params: SpunkParams }
> = {
  resonant: {
    label: "Resonant",
    hint: "Paper-Verifikation · RCF 0.9998 · ΔE 0.012",
    params: { ...DEFAULT_PARAMS },
  },
  odos: {
    label: "ODOS-Veto",
    hint: "ΔE ≥ 0.05 · Gitter sperrt Leitung",
    params: { ...DEFAULT_PARAMS, deltaE: 0.08, rcf: 0.97 },
  },
  rcf: {
    label: "RCF-Veto",
    hint: "Kohärenz unter 0.95 · Heaviside = 0",
    params: { ...DEFAULT_PARAMS, rcf: 0.82, deltaE: 0.02 },
  },
  authenticity: {
    label: "Authentizität",
    hint: "A < 1 − δ_ODOS · P_res ≡ 0",
    params: { ...DEFAULT_PARAMS, fidelityA: 0.91, overlapR: 0.96 },
  },
};

export function evaluateSpunk(p: SpunkParams): SpunkResult {
  const t0 =
    typeof performance !== "undefined" ? performance.now() : Date.now();

  const heavisideRcf = p.rcf >= RCF_MIN ? 1 : 0;
  const heavisideOdos = p.deltaE <= DELTA_ODOS ? 1 : 0;
  const structuralThreshold = 1 - DELTA_ODOS;
  const passedPres =
    p.fidelityA >= structuralThreshold && p.overlapR >= RCF_MIN;
  const pRes = passedPres ? p.fidelityA * p.overlapR : 0;
  const passedMatrix = !(p.deltaE >= DELTA_ODOS || p.rcf < RCF_MIN);
  const resistanceOhm = passedMatrix
    ? RESISTANCE_GROUND_OHM * (1 + 0.1 * p.deltaE)
    : null;
  const energyJ = passedMatrix ? ENERGY_PER_SWITCH_J : 0;
  const willEnergy = p.lambda * p.rcf;
  const sqrtW = Math.sqrt(Math.max(0, willEnergy));

  let status: SpunkStatus = "MANIFESTATION_SUCCESS";
  let spunkAmplitude = 0;
  let continuity = 0;

  if (heavisideRcf === 0 || heavisideOdos === 0) {
    status = "VETOED";
  } else if (!passedPres) {
    status = "AUTHENTICITY_MISMATCH_VETO";
  } else if (!passedMatrix) {
    status = "ATOMIC_BLOCKADE";
  } else {
    spunkAmplitude = heavisideRcf * heavisideOdos * sqrtW * pRes;
    continuity = 1;
  }

  const warpPhi =
    status === "MANIFESTATION_SUCCESS"
      ? PHI0 * heavisideRcf * (1 - p.deltaE)
      : 0;

  const t1 =
    typeof performance !== "undefined" ? performance.now() : Date.now();

  return {
    status,
    spunkAmplitude,
    willEnergy,
    sqrtW,
    pRes,
    resistanceOhm,
    energyJ,
    latencyUs: Math.max(0.01, (t1 - t0) * 1000),
    teleportationContinuity: continuity,
    warpPhi,
    fiberExpansion: Math.exp(2 * warpPhi),
    heavisideRcf,
    heavisideOdos,
    passedPres,
    passedMatrix,
    structuralThreshold,
  };
}

export function statusLabel(status: SpunkStatus, maus: boolean): string {
  if (maus) {
    switch (status) {
      case "MANIFESTATION_SUCCESS":
        return "Alles passt — Form und Lebensrucksack sind wieder zusammen.";
      case "VETOED":
        return "Stopp. Die Werte sind nicht stimmig genug.";
      case "AUTHENTICITY_MISMATCH_VETO":
        return "Das ist nicht dieselbe Person — der Spiegel sagt Nein.";
      case "ATOMIC_BLOCKADE":
        return "Der Kristall lässt den Impuls nicht durch.";
      default:
        return "Bereit. Noch nichts passiert.";
    }
  }
  switch (status) {
    case "MANIFESTATION_SUCCESS":
      return "Manifestation erfolgreich";
    case "VETOED":
      return "Heaviside-Veto";
    case "AUTHENTICITY_MISMATCH_VETO":
      return "Authentizitäts-Veto";
    case "ATOMIC_BLOCKADE":
      return "Atomare Gitter-Sperre";
    default:
      return "Bereit";
  }
}

export function formatSci(n: number, digits = 3): string {
  if (!Number.isFinite(n)) return "∞";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e-3 && abs < 1e4) return n.toFixed(digits);
  return n.toExponential(digits);
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
