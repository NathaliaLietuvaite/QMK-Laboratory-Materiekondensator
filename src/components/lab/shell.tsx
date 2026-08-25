import {
  Atom,
  BookOpen,
  Box,
  FlaskConical,
  GitBranch,
  Share2,
  SquareCode,
} from "lucide-react";
import { ConsoleView } from "@/components/lab/console";
import { TopologyView } from "@/components/lab/topology";
import { SubstrateView } from "@/components/lab/substrate";
import { PipelineView } from "@/components/lab/pipeline";
import { NotebookView } from "@/components/lab/notebook";
import { SpecView } from "@/components/lab/spec";
import { PublishView } from "@/components/lab/publish";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLabStore, type LabView } from "@/lib/qmk/store";
import { cn } from "@/lib/utils";

const NAV: { id: LabView; label: string; icon: typeof Atom }[] = [
  { id: "console", label: "Konsole", icon: FlaskConical },
  { id: "topology", label: "Topologie", icon: GitBranch },
  { id: "substrate", label: "Substrat", icon: Atom },
  { id: "pipeline", label: "Pipeline", icon: Box },
  { id: "notebook", label: "Notebook", icon: SquareCode },
  { id: "spec", label: "Spezifikation", icon: BookOpen },
  { id: "publish", label: "Publizieren", icon: Share2 },
];

export function LabShell() {
  const view = useLabStore((s) => s.view);
  const setView = useLabStore((s) => s.setView);
  const mausMode = useLabStore((s) => s.mausMode);
  const setMausMode = useLabStore((s) => s.setMausMode);
  const last = useLabStore((s) => s.lastResult);
  const runCount = useLabStore((s) => s.runCount);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <div className="mr-auto min-w-0">
            <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted uppercase">
              QMK-RVC-V7 · MOD-46
            </p>
            <h1 className="font-display text-lg leading-tight text-fg sm:text-xl">
              Materiekondensator
            </h1>
          </div>
          <Badge
            variant={
              last?.status === "MANIFESTATION_SUCCESS"
                ? "resonance"
                : last
                  ? "veto"
                  : "default"
            }
          >
            {last ? last.status.replaceAll("_", " ") : "IDLE"}
            {runCount ? ` · ${runCount}` : ""}
          </Badge>
          <Button
            size="sm"
            variant={mausMode ? "default" : "secondary"}
            onClick={() => setMausMode(!mausMode)}
            aria-pressed={mausMode}
          >
            {mausMode ? "Maus-Modus" : "Fachmodus"}
          </Button>
        </div>
        <nav
          className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6"
          aria-label="Labor"
        >
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={cn(
                  "inline-flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150",
                  active
                    ? "bg-surface-2 text-fg"
                    : "text-muted hover:bg-surface hover:text-fg",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {view === "console" ? <ConsoleView /> : null}
        {view === "topology" ? <TopologyView /> : null}
        {view === "substrate" ? <SubstrateView /> : null}
        {view === "pipeline" ? <PipelineView /> : null}
        {view === "notebook" ? <NotebookView /> : null}
        {view === "spec" ? <SpecView /> : null}
        {view === "publish" ? <PublishView /> : null}
      </main>

      <footer className="border-t border-border px-4 py-4 text-center text-xs text-subtle sm:px-6">
        Computationales Labor · Spezifikation QMK-RVC-V7 · MIT
      </footer>
    </div>
  );
}
