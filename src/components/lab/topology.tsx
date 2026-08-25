import { FieldCanvas } from "@/components/lab/field-canvas";
import { Badge } from "@/components/ui/badge";
import { useLabStore } from "@/lib/qmk/store";

const FIBERS = [
  {
    symbol: "S¹_metabolic",
    title: "Metabolische Kreislinie",
    body: "Kompakte S¹-Topologie für Atmung, Circadianik und Stoffwechselfluss. Periodisch, geschlossen, ohne Rand.",
    maus: "Der Herzschlag und die Atmung sind ein Kreis: immer weiter, ohne Anfang und Ende.",
  },
  {
    symbol: "C_immune",
    title: "Immun-Mannigfaltigkeit",
    body: "Riemannsche Mannigfaltigkeit mit positiver Schnittkrümmung. Diskrete proteomische Konformationen bleiben in einer gekrümmten Tasche.",
    maus: "Das Immunsystem merkt sich Formen — wie ein weiches, gebogenes Fach für Schlüssel und Schlösser.",
  },
  {
    symbol: "H_neural",
    title: "Neuraler Hilbert-Raum",
    body: "Gedämpfter Hilbert-Unterraum für elektromagnetische und elektrochemische Phasengradienten. Dynamisch, nicht statisch.",
    maus: "Gedanken sind Wellen, kein Foto. Sie müssen mitschwingen, sonst kommt nur eine leere Hülle an.",
  },
];

export function TopologyView() {
  const maus = useLabStore((s) => s.mausMode);
  const result = useLabStore((s) => s.lastResult);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-xs tracking-widest text-muted uppercase">
              Faserbündel
            </p>
            <h2 className="font-display text-xl text-fg">
              ℳ₇ = ℳ₄ × ℱ₃
            </h2>
          </div>
          <Badge variant={result?.warpPhi ? "resonance" : "default"}>
            {result
              ? `e²φ = ${result.fiberExpansion.toFixed(3)}`
              : "φ → 0 idle"}
          </Badge>
        </div>
        <div className="relative aspect-[16/11] min-h-[240px] bg-bg">
          <FieldCanvas mode="fiber" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm leading-relaxed text-muted text-pretty">
          {maus
            ? "Ein Mensch ist nicht nur ein Körper. Wenn wir ihn schicken, packen wir Herzschlag, Abwehr und Gedanken in einen extra geschützten 3D-Rucksack. Drüben wird der Rucksack wieder angelegt — ohne dass eine Zelle fehlt."
            : "Die V6-Diskontinuität: digitale Kanäle übertragen nur den geometrischen Kern |L⟩. V7 erweitert die Operationsmannigfaltigkeit. Die Faser ℱ₃ trägt die lebenswesentlichen Augmentationen parallel, mit τ_transfer = 0."}
        </p>
        <ul className="flex flex-col gap-3">
          {FIBERS.map((f) => (
            <li
              key={f.symbol}
              className="rounded-lg border border-border bg-surface p-4"
            >
              <p className="font-mono text-xs text-resonance">{f.symbol}</p>
              <h3 className="mt-1 text-sm font-medium text-fg">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted text-pretty">
                {maus ? f.maus : f.body}
              </p>
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-border bg-surface p-4 font-mono text-xs leading-relaxed text-muted">
          g₇ = g₄ + e
          <sup>2φ(x)</sup> g₃
          <br />
          φ(x) = φ₀ · Θ(RCF − RCF_min) · (1 − ΔE)
        </div>
      </div>
    </div>
  );
}
