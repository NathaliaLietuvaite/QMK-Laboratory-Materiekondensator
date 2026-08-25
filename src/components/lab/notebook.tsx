import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLabStore } from "@/lib/qmk/store";
import { evaluateSpunk, formatSci, type SpunkResult } from "@/lib/qmk/physics";
import { downloadBlob, notebookIpynb, pythonModuleSource } from "@/lib/qmk/export";
import { Download, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type CellOut = { text: string; ok: boolean } | null;

export function NotebookView() {
  const s = useLabStore();
  const [out1, setOut1] = useState<CellOut>(null);
  const [out2, setOut2] = useState<CellOut>(null);
  const [out3, setOut3] = useState<CellOut>(null);

  const src2 = useMemo(
    () =>
      `transporter = WarpedFiber7DTransporter()
result = transporter.execute_dual_spunk_manifestation(
    vacuum_potential_lambda=${s.lambda},
    rcf_omega_sq=${s.rcf},
    delta_e=${s.deltaE},
    structural_fidelity_a=${s.fidelityA},
    resonant_overlap_r=${s.overlapR},
)
result`,
    [s.lambda, s.rcf, s.deltaE, s.fidelityA, s.overlapR],
  );

  const runCell2 = () => {
    const r = evaluateSpunk({
      lambda: s.lambda,
      rcf: s.rcf,
      deltaE: s.deltaE,
      fidelityA: s.fidelityA,
      overlapR: s.overlapR,
    });
    s.execute();
    setOut2({ text: formatResult(r), ok: r.status === "MANIFESTATION_SUCCESS" });
  };

  const runCell3 = () => {
    const veto = evaluateSpunk({
      lambda: 1,
      rcf: 0.81,
      deltaE: 0.09,
      fidelityA: 0.99,
      overlapR: 0.99,
    });
    setOut3({ text: formatResult(veto), ok: false });
  };

  const downloadIpynb = () => {
    downloadBlob(
      "QMK-RVC-V7-MOD46.ipynb",
      notebookIpynb(
        {
          lambda: s.lambda,
          rcf: s.rcf,
          deltaE: s.deltaE,
          fidelityA: s.fidelityA,
          overlapR: s.overlapR,
        },
        s.lastResult,
      ),
      "application/x-ipynb+json",
    );
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs tracking-widest text-muted uppercase">
            Colab-Analog
          </p>
          <h2 className="font-display text-2xl text-fg">Notebook MOD-46</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              downloadBlob(
                "vmax_add_module_46_biocrystal_perovskite.py",
                pythonModuleSource(),
                "text/x-python",
              )
            }
          >
            <Download />
            .py
          </Button>
          <Button size="sm" onClick={downloadIpynb}>
            <Download />
            .ipynb
          </Button>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted text-pretty">
        Zellen laufen hier im Browser gegen dieselbe Algebra wie das Python-Modul.
        Die Datei <span className="font-mono text-fg">.ipynb</span> öffnest du in
        Google Colab: Datei → Notebook hochladen.
      </p>

      <Cell
        n={1}
        title="Modul laden"
        code={`from qmk_mod46 import WarpedFiber7DTransporter, BioCrystallineMemristorMatrix
# Äquivalent: Klassen aus der Spezifikation QMK-RVC-V7`}
        onRun={() =>
          setOut1({
            text: "ACTIVE: MOD-46 Bio-Crystalline 7D Transporter mounted with Dual Spunk Operator.",
            ok: true,
          })
        }
        out={out1}
      />
      <Cell n={2} title="Dual Spunk — aktuelle Konsolenparameter" code={src2} onRun={runCell2} out={out2} />
      <Cell
        n={3}
        title="Negativkontrolle · Veto"
        code={`transporter.execute_dual_spunk_manifestation(
    rcf_omega_sq=0.81,
    delta_e=0.09,
)`}
        onRun={runCell3}
        out={out3}
      />
    </div>
  );
}

function formatResult(r: SpunkResult) {
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
    `}`,
  ].join("\n");
}

function Cell({
  n,
  title,
  code,
  onRun,
  out,
}: {
  n: number;
  title: string;
  code: string;
  onRun: () => void;
  out: CellOut;
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-surface">
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted">[{n}]</span>
          <h3 className="text-sm text-fg">{title}</h3>
        </div>
        <Button size="sm" variant="ghost" onClick={onRun}>
          <Play />
          Run
        </Button>
      </header>
      <pre className="overflow-x-auto bg-bg px-4 py-3 font-mono text-xs leading-relaxed text-fg/90">
        {code}
      </pre>
      {out ? (
        <div
          className={cn(
            "border-t border-border px-4 py-3 font-mono text-xs leading-relaxed whitespace-pre-wrap",
            out.ok ? "text-resonance" : "text-veto",
          )}
        >
          <Badge variant={out.ok ? "resonance" : "veto"} className="mb-2">
            stdout
          </Badge>
          <div>{out.text}</div>
        </div>
      ) : null}
    </article>
  );
}
