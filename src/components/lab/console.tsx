import { Play, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FieldCanvas } from "@/components/lab/field-canvas";
import { ParamSlider } from "@/components/lab/param-slider";
import {
  PRESETS,
  formatSci,
  statusLabel,
  DELTA_ODOS,
  RCF_MIN,
} from "@/lib/qmk/physics";
import { useLabStore } from "@/lib/qmk/store";

export function ConsoleView() {
  const s = useLabStore();
  const result = s.lastResult;
  const ok = result?.status === "MANIFESTATION_SUCCESS";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1.15fr)_22rem]">
      <div className="order-2 flex min-h-0 flex-col gap-4 lg:order-1">
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="text-xs tracking-widest text-muted uppercase">
                Resonanzkammer
              </p>
              <h2 className="font-display text-xl text-fg text-balance">
                Dual-Spunk-Operator
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={ok ? "resonance" : result ? "veto" : "default"}>
                {result ? result.status.replaceAll("_", " ") : "IDLE"}
              </Badge>
              <Button size="sm" className="lg:hidden" onClick={() => s.execute()}>
                <Play />
                Ŝ
              </Button>
            </div>
          </div>
          <div className="relative aspect-[16/11] min-h-[240px] bg-bg">
            <FieldCanvas mode="chamber" />
          </div>
          <p className="border-t border-border px-4 py-3 text-sm text-muted text-pretty">
            {s.mausMode
              ? "Der Wille nimmt ein winziges Fünkchen Energie und setzt Form plus Lebens-Rucksack wieder zusammen — aber nur, wenn Herzschlag, Immunsystem und Gedanken stimmig sind."
              : "Ŝ = Θ(RCF − RCFmin) · Θ(δODOS − ΔE) · √(Λ|Ω|²) · Pres. Heaviside-Gatter und atomare ODOS-Sperre sind hart verdrahtet."}
          </p>
        </div>

        {result ? (
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            <Stat
              label="Amplitude Ŝ"
              value={formatSci(result.spunkAmplitude, 6)}
            />
            <Stat label="Will W" value={formatSci(result.willEnergy, 4)} />
            <Stat
              label="P_res"
              value={formatSci(result.pRes, 4)}
            />
            <Stat
              label="R Ω"
              value={
                result.resistanceOhm == null
                  ? "∞"
                  : formatSci(result.resistanceOhm, 2)
              }
            />
            <Stat
              label="Energie"
              value={`${formatSci(result.energyJ * 1e15, 2)} fJ`}
            />
            <Stat
              label="Latenz"
              value={`${formatSci(result.latencyUs, 2)} µs`}
            />
            <Stat
              label="Warp φ"
              value={formatSci(result.warpPhi, 4)}
            />
            <Stat
              label="Kontinuität"
              value={result.teleportationContinuity.toFixed(4)}
            />
          </dl>
        ) : (
          <div className="rounded-xl border border-dashed border-border px-4 py-6 text-sm text-muted">
            Parameter setzen, dann Operator ausführen. Die Verifikationswerte
            der Spezifikation liegen als Preset Resonant bereit.
          </div>
        )}
      </div>

      <aside className="order-1 flex flex-col gap-5 rounded-xl border border-border bg-surface p-5 lg:order-2">
        <div className="flex flex-wrap gap-2">
          {Object.entries(PRESETS).map(([id, preset]) => (
            <Button
              key={id}
              size="sm"
              variant="secondary"
              onClick={() => s.applyPreset(id as keyof typeof PRESETS)}
            >
              {preset.label}
            </Button>
          ))}
        </div>

        <ParamSlider
          label="Vakuumpotential"
          symbol="Λ"
          value={s.lambda}
          min={0}
          max={2}
          step={0.01}
          onChange={(v) => s.setParam("lambda", v)}
          hint="W = Λ · |Ω|²"
        />
        <ParamSlider
          label="Kohärenz"
          symbol="RCF |Ω|²"
          value={s.rcf}
          min={0.7}
          max={1}
          step={0.0001}
          onChange={(v) => s.setParam("rcf", v)}
          hint={`Schwelle ${RCF_MIN}`}
        />
        <ParamSlider
          label="Dissonanz"
          symbol="ΔE"
          value={s.deltaE}
          min={0}
          max={0.12}
          step={0.001}
          onChange={(v) => s.setParam("deltaE", v)}
          hint={`ODOS-Gate ΔE < ${DELTA_ODOS}`}
        />
        <ParamSlider
          label="Strukturelle Treue"
          symbol="𝒜"
          value={s.fidelityA}
          min={0.85}
          max={1}
          step={0.001}
          onChange={(v) => s.setParam("fidelityA", v)}
        />
        <ParamSlider
          label="Resonante Überlappung"
          symbol="ℛ"
          value={s.overlapR}
          min={0.85}
          max={1}
          step={0.001}
          onChange={(v) => s.setParam("overlapR", v)}
        />

        <div className="mt-auto flex flex-col gap-2 pt-2">
          <p className="text-sm text-muted text-pretty">
            {result
              ? statusLabel(result.status, s.mausMode)
              : s.mausMode
                ? "Bereit. Noch ist der Kristall still."
                : "Kein Lauf. Operator idle."}
          </p>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={() => s.execute()}>
              <Play />
              Ŝ ausführen
            </Button>
            <Button variant="outline" size="icon" onClick={() => s.reset()} aria-label="Zurücksetzen">
              <RotateCcw />
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface px-3 py-3">
      <dt className="text-[0.6875rem] tracking-wide text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-sm tabular-nums text-fg">{value}</dd>
    </div>
  );
}
