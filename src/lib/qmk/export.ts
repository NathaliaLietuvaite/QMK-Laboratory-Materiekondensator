import type { SpunkParams, SpunkResult } from "./physics";

export function pythonModuleSource(): string {
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

export function notebookIpynb(params: SpunkParams, result: SpunkResult | null): string {
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
        "$$\\hat{S} = \\Theta(\\mathrm{RCF}-\\mathrm{RCF}_{\\min})\\cdot\\Theta(\\delta_{\\mathrm{ODOS}}-\\Delta E)\\cdot\\sqrt{\\Lambda|\\Omega|^2}\\cdot P_{\\mathrm{res}}$$\n",
      ],
    },
    {
      cell_type: "code",
      metadata: {},
      execution_count: null,
      outputs: [],
      source: pythonModuleSource()
        .split("\nif __name__")[0]
        .split("\n")
        .map((l, i, a) => (i === a.length - 1 ? l : l + "\n")),
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
        "result\n",
      ],
    },
    {
      cell_type: "markdown",
      metadata: {},
      source: [
        "## Erwartete Laborwerte (Browser-Run)\n",
        result
          ? `\nStatus: \`${result.status}\`  \nSpunk-Amplitude: \`${result.spunkAmplitude.toFixed(6)}\`  \nWill-Energie W: \`${result.willEnergy.toFixed(6)}\`  \nP_res: \`${result.pRes.toFixed(6)}\`\n`
          : "\nNoch kein Lauf im Labor. Zelle oben ausführen.\n",
      ],
    },
  ];

  return JSON.stringify(
    {
      nbformat: 4,
      nbformat_minor: 5,
      metadata: {
        kernelspec: {
          display_name: "Python 3",
          language: "python",
          name: "python3",
        },
        language_info: { name: "python", pygments_lexer: "ipython3" },
      },
      cells,
    },
    null,
    2,
  );
}

export function downloadBlob(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
