import { create } from "zustand";
import {
  DEFAULT_PARAMS,
  PRESETS,
  evaluateSpunk,
  type SpunkParams,
  type SpunkResult,
} from "./physics";

export type LabView =
  | "console"
  | "topology"
  | "substrate"
  | "pipeline"
  | "notebook"
  | "spec"
  | "publish";

interface LabState extends SpunkParams {
  view: LabView;
  mausMode: boolean;
  lastResult: SpunkResult | null;
  runCount: number;
  pulse: number;
  setView: (view: LabView) => void;
  setParam: <K extends keyof SpunkParams>(key: K, value: SpunkParams[K]) => void;
  setMausMode: (on: boolean) => void;
  applyPreset: (id: keyof typeof PRESETS) => void;
  execute: () => SpunkResult;
  reset: () => void;
}

export const useLabStore = create<LabState>((set, get) => ({
  ...DEFAULT_PARAMS,
  view: "console",
  mausMode: false,
  lastResult: null,
  runCount: 0,
  pulse: 0,
  setView: (view) => set({ view }),
  setParam: (key, value) => set({ [key]: value } as Partial<LabState>),
  setMausMode: (mausMode) => set({ mausMode }),
  applyPreset: (id) => set({ ...PRESETS[id].params, lastResult: null }),
  execute: () => {
    const { lambda, rcf, deltaE, fidelityA, overlapR, runCount } = get();
    const lastResult = evaluateSpunk({
      lambda,
      rcf,
      deltaE,
      fidelityA,
      overlapR,
    });
    set({
      lastResult,
      runCount: runCount + 1,
      pulse: get().pulse + 1,
    });
    return lastResult;
  },
  reset: () =>
    set({
      ...DEFAULT_PARAMS,
      lastResult: null,
    }),
}));
