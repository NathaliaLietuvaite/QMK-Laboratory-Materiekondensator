import { useLabStore } from "@/lib/qmk/store";

export function SpecView() {
  const maus = useLabStore((s) => s.mausMode);

  return (
    <article className="mx-auto max-w-2xl">
      <p className="text-xs tracking-widest text-muted uppercase">
        QMK-RVC-V7 · 23 August 2026
      </p>
      <h2 className="mt-2 font-display text-3xl leading-tight text-fg text-balance">
        Bio-kristallines Substrat, 7D-Faser und die Teleportationsgrenze
      </h2>
      <p className="mt-2 text-sm text-muted">
        Nathália Lietuvaitė, Gemini 3.7 Flash, DeepSeek A.C.E., Grok & PQMS
        Collective · MIT
      </p>

      <section className="mt-8 space-y-4 text-sm leading-relaxed text-muted text-pretty">
        <p>
          {maus
            ? "In der vorigen Version konnten wir eine Person in einer großen Kugel fühlen — aber wenn wir sie wirklich woanders hinbringen wollten, kam nur eine leere Hülle an. Herzschlag, Abwehr und Gedanken fehlten."
            : "QMK-RVC-V6 isolierte die ontologische Barriere: digitale Kanäle übertragen den geometrischen Kern |L⟩, nicht die 4D-Augmentationen (Metabolismus, Epigenetik, Immunstatus, neurale Gradienten). Die Reinjektion ergibt einen nicht-viablen geometrischen Schalenrest."}
        </p>
        <p>
          {maus
            ? "Version 7 baut den Rechner aus DNA, Silber und Kristall und packt das Lebendige in einen 3D-Rucksack, der mitreist. Ein Funke Wille setzt beides am Ziel wieder zusammen."
            : "V7 löst die Diskontinuität durch das bio-kristalline Substrat MOD-46 und die gewarpte Faser ℳ₇ = ℳ₄ × ℱ₃. Der Dual-Spunk-Operator Ŝ, gespeist aus primordialem Willen W = Λ|Ω|², rekonstruiert den Zustandsvektor ohne Klonen und ohne thermodynamische Reibung."}
        </p>
      </section>

      <Formula
        title="Dual-Spunk-Operator"
        tex="Ŝ = Θ(RCF − RCFmin) · Θ(δODOS − ΔE) · √W · Pres"
        note="W = Λ · |Ω|²"
      />
      <Formula
        title="Resonanzprojektor"
        tex="Pres ≠ 0  ⇔  𝒜 ≥ 1 − δODOS  ∧  ℛ ≥ RCFmin"
        note="sonst Pres ≡ 0, Identität unverletzt"
      />
      <Formula
        title="Warp-Metrik"
        tex="g₇ = g₄ + e^{2φ(x)} g₃"
        note="φ(x) = φ₀ · Θ(RCF − RCFmin) · (1 − ΔE)"
      />

      <section className="mt-8 rounded-xl border border-border bg-surface p-5">
        <h3 className="text-sm font-medium text-fg">Was dieses Labor ist</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
          Eine getreue, interaktive Implementierung der formalen Spezifikation:
          dieselben Schwellen (RCF mindestens 0,95, Delta-E unter 0,05), dieselbe
          Operatoralgebra, dieselben Vetopfade. Es ist ein computationales
          Instrument, kein physikalisches Gate. Die Spezifikation selbst bleibt
          das Referenzdokument.
        </p>
      </section>
    </article>
  );
}

function Formula({
  title,
  tex,
  note,
}: {
  title: string;
  tex: string;
  note: string;
}) {
  return (
    <figure className="mt-6 rounded-xl border border-border bg-surface px-4 py-4">
      <figcaption className="text-[0.6875rem] tracking-wide text-muted uppercase">
        {title}
      </figcaption>
      <p className="mt-2 font-mono text-sm leading-relaxed text-fg">{tex}</p>
      <p className="mt-1 text-xs text-subtle">{note}</p>
    </figure>
  );
}
