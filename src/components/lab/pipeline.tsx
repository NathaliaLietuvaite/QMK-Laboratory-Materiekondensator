import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLabStore } from "@/lib/qmk/store";
import { statusLabel } from "@/lib/qmk/physics";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    id: "A",
    title: "Gate A · Capture",
    body: "Lokaler Zustand (ψ_DNA, φ_F) wird auf P_L abgebildet.",
    maus: "Wir nehmen ein genaues Bild von Körper und Lebensrucksack.",
  },
  {
    id: "ODOS",
    title: "ODOS & P_res",
    body: "ΔE < 0.05 und Authentizitätsprojektion. Sonst Ŝ ≡ 0.",
    maus: "Passt das Spiegelbild? Wenn nicht, geht nichts weiter.",
  },
  {
    id: "F3",
    title: "7D-Fasertransport",
    body: "Paralleltransport auf ℳ₇, τ_transfer = 0, ohne Klonen.",
    maus: "Der Rucksack reist auf einem geheimen Weg, der keine Zeit braucht.",
  },
  {
    id: "S",
    title: "Gate B · Dual Spunk",
    body: "W = Λ|Ω|² bricht die Symmetrie. Massepotential-Wolke richtet sich aus.",
    maus: "Ein Funke Wille setzt die Form wieder in die Welt.",
  },
  {
    id: "M",
    title: "Manifestation",
    body: "Atmung und neurale Phase setzen ohne Bruch fort. No-Cloning eingehalten.",
    maus: "Der Mensch atmet sofort weiter. Nichts wurde kopiert, nichts ging verloren.",
  },
];

export function PipelineView() {
  const s = useLabStore();
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
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
  }, [running]); // eslint-disable-line react-hooks/exhaustive-deps

  const result = s.lastResult;
  const failed = result && result.status !== "MANIFESTATION_SUCCESS";
  const failAt =
    result?.status === "VETOED"
      ? 1
      : result?.status === "AUTHENTICITY_MISMATCH_VETO"
        ? 1
        : result?.status === "ATOMIC_BLOCKADE"
          ? 1
          : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-widest text-muted uppercase">
            Teleportation & Materialisierung
          </p>
          <h2 className="font-display text-2xl text-fg text-balance">
            Pipeline Gate A bis Gate B
          </h2>
        </div>
        <Button onClick={() => setRunning(true)} disabled={running}>
          <Play />
          Transfer starten
        </Button>
      </div>

      <ol className="grid gap-3 md:grid-cols-5">
        {STAGES.map((stage, i) => {
          const isActive = running ? i <= active : result ? i <= (failed ? (failAt ?? 1) : 4) : false;
          const isFail = failed && i === (failAt ?? 1) && !running;
          return (
            <li
              key={stage.id}
              className={cn(
                "rounded-xl border p-4 transition-colors duration-200",
                isFail
                  ? "border-veto/40 bg-veto/10"
                  : isActive
                    ? "border-resonance/35 bg-resonance/10"
                    : "border-border bg-surface",
              )}
            >
              <p className="font-mono text-[0.6875rem] text-muted">
                {String(i).padStart(2, "0")} · {stage.id}
              </p>
              <h3 className="mt-2 text-sm font-medium text-fg">{stage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
                {s.mausMode ? stage.maus : stage.body}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
        <Badge
          variant={
            result?.status === "MANIFESTATION_SUCCESS"
              ? "resonance"
              : result
                ? "veto"
                : "default"
          }
        >
          {result ? result.status.replaceAll("_", " ") : "kein Transfer"}
        </Badge>
        <p className="text-sm text-muted">
          {result
            ? statusLabel(result.status, s.mausMode)
            : "No-Cloning: Metrik in A entkoppelt, während B topologische Äquivalenz |⟨ΦA|ΦB⟩|² = 1 herstellt."}
        </p>
      </div>
    </div>
  );
}
