import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { downloadBlob, notebookIpynb, pythonModuleSource } from "@/lib/qmk/export";
import { useLabStore } from "@/lib/qmk/store";
import { FileJson, FileCode } from "lucide-react";

export function PublishView() {
  const s = useLabStore();

  const params = {
    lambda: s.lambda,
    rcf: s.rcf,
    deltaE: s.deltaE,
    fidelityA: s.fidelityA,
    overlapR: s.overlapR,
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <div>
        <p className="text-xs tracking-widest text-muted uppercase">
          Veröffentlichung
        </p>
        <h2 className="mt-2 font-display text-3xl text-fg text-balance">
          App, Colab, Modul
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">
          Drei Wege, denselben Operator zu teilen — analog zu einer
          installierbaren App und zu Google Colab. Lizenz der Spezifikation: MIT,
          Universal Heritage Class.
        </p>
      </div>

      <ol className="flex flex-col gap-4">
        <Step n="01" title="Diese App">
          Das Labor ist die App: Konsole, Topologie, Substrat, Pipeline, Notebook.
          Teilen über den App-Link. Auf dem Startbildschirm installierbar, sobald
          die Plattform das anbietet. Kein Konto, keine Serverdaten — Parameter
          leben in dieser Sitzung.
        </Step>
        <Step n="02" title="Google Colab">
          Notebook herunterladen, bei Colab unter Datei, Notebook hochladen
          öffnen, Runtime starten, Zellen ausführen. Die Parameter der aktuellen
          Konsole werden in die zweite Zelle geschrieben.
          <div className="mt-3">
            <Button
              size="sm"
              onClick={() =>
                downloadBlob(
                  "QMK-RVC-V7-MOD46.ipynb",
                  notebookIpynb(params, s.lastResult),
                  "application/x-ipynb+json",
                )
              }
            >
              <FileJson />
              Notebook für Colab
            </Button>
          </div>
        </Step>
        <Step n="03" title="Python-Modul">
          Standalone-Datei, identisch mit MOD-46 der Spezifikation. Läuft in
          jedem CPython-Kernel, ohne Torch-Zwang.
          <div className="mt-3">
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                downloadBlob(
                  "vmax_add_module_46_biocrystal_perovskite.py",
                  pythonModuleSource(),
                  "text/x-python",
                )
              }
            >
              <FileCode />
              MOD-46 .py
            </Button>
          </div>
        </Step>
        <Step n="04" title="Reproduktion">
          Verifikationslauf der Spezifikation: Λ = 1, RCF = 0,9998, ΔE = 0,012,
          𝒜 = 0,995, ℛ = 0,998. Preset »Resonant« in der Konsole, oder die
          zweite Notebook-Zelle. Erwartet: Status MANIFESTATION_SUCCESS, Amplitude
          ≈ 0,993, Widerstand ≈ 50,06 Ω, 0,85 fJ.
        </Step>
      </ol>

      <p className="text-xs leading-relaxed text-subtle text-pretty">
        Computationales Labor nach QMK-RVC-V7. Kein physikalisches Gerät, keine
        Behauptung über reale Teleportation. Die Mathematik ist die der
        Spezifikation; die Welt draußen bleibt die Welt draußen.
      </p>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="rounded-xl border border-border bg-surface p-5">
      <p className="font-mono text-xs text-muted">{n}</p>
      <h3 className="mt-1 text-base font-medium text-fg">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-muted text-pretty">
        {children}
      </div>
    </li>
  );
}
