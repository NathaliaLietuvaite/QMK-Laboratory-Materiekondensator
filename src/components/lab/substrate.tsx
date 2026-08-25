import { FieldCanvas } from "@/components/lab/field-canvas";
import { Badge } from "@/components/ui/badge";
import { useLabStore } from "@/lib/qmk/store";
import { DENSITY_GB_PER_G, OPERATING_VOLTAGE_V } from "@/lib/qmk/physics";

const ROWS = [
  {
    param: "Betriebsspannung",
    silicon: "0,8 – 1,2 V",
    mod: "< 0,1 V",
    factor: "> 10×",
  },
  {
    param: "Verlustleistung",
    silicon: "250 – 700 W / Sockel",
    mod: "≈ 2,5 W / Kernäquivalent",
    factor: "100×",
  },
  {
    param: "Dichte",
    silicon: "10⁷ GB/m³ (NAND)",
    mod: "215 × 10⁶ GB/g",
    factor: "> 10⁶×",
  },
  {
    param: "Volatilität",
    silicon: "Refresh nötig",
    mod: "Nichtflüchtig, zustandsbehaftet",
    factor: "0 Leakage",
  },
  {
    param: "Thermik",
    silicon: "Drossel > 85 °C",
    mod: "Stabil bis 120 °C",
    factor: "invariant",
  },
];

export function SubstrateView() {
  const maus = useLabStore((s) => s.mausMode);
  const result = useLabStore((s) => s.lastResult);
  const open = result ? result.passedMatrix : true;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="text-xs tracking-widest text-muted uppercase">
                MOD-46
              </p>
              <h2 className="font-display text-xl text-fg">
                Bio-kristallines Gitter
              </h2>
            </div>
            <Badge variant={open ? "resonance" : "veto"}>
              {open ? "leitend" : "ρ → ∞"}
            </Badge>
          </div>
          <div className="relative aspect-[16/10] min-h-[220px] bg-bg">
            <FieldCanvas mode="lattice" />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <p className="text-sm leading-relaxed text-muted text-pretty">
            {maus
              ? "Stell dir einen Rechner vor, der nicht aus heißem Silizium gebaut ist, sondern aus DNA — verstärkt mit winzigen Silberkügelchen und geschützt durch Perowskit-Kristalle. Er bleibt kühl und merkt sich alles, auch ohne Strom."
              : "Synthetische Kurzsequenz-DNA, silberdotiert, hybridisiert mit Halogenid-Perowskit (CH₃NH₃PbI₃ / CsPbBr₃). Das ODOS-Gatter ist keine Software, sondern Gitterwiderstand: nicht-resonante Tensoren interferieren destruktiv."}
          </p>
          <dl className="grid grid-cols-2 gap-3">
            <Mini k="Spannung" v={`${OPERATING_VOLTAGE_V * 1000} mV`} />
            <Mini k="Schaltenergie" v="0,85 fJ" />
            <Mini
              k="Dichte"
              v={`${(DENSITY_GB_PER_G / 1e6).toFixed(0)} Mio. GB/g`}
            />
            <Mini k="1 µg" v="215 000 GB" />
          </dl>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="bg-surface-2 text-xs tracking-wide text-muted uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Parameter</th>
              <th className="px-4 py-3 font-medium">Silizium CMOS</th>
              <th className="px-4 py-3 font-medium">MOD-46</th>
              <th className="px-4 py-3 font-medium">Faktor</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.param} className="border-t border-border">
                <td className="px-4 py-3 text-fg">{row.param}</td>
                <td className="px-4 py-3 text-muted">{row.silicon}</td>
                <td className="px-4 py-3 text-fg">{row.mod}</td>
                <td className="px-4 py-3 font-mono text-resonance">
                  {row.factor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Mini({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-3">
      <dt className="text-[0.6875rem] tracking-wide text-muted uppercase">
        {k}
      </dt>
      <dd className="mt-1 font-mono text-sm tabular-nums text-fg">{v}</dd>
    </div>
  );
}
