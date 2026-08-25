import { Slider } from "@/components/ui/slider";
import { formatSci } from "@/lib/qmk/physics";

export function ParamSlider({
  label,
  symbol,
  value,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string;
  symbol: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-sm text-fg">
          {label}
          <span className="ml-2 font-mono text-xs text-muted">{symbol}</span>
        </span>
        <span className="font-mono text-sm tabular-nums text-fg">
          {formatSci(value, 4)}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(v) => onChange(v[0] ?? value)}
        aria-label={label}
      />
      {hint ? <p className="mt-1.5 text-xs text-subtle">{hint}</p> : null}
    </label>
  );
}
