interface TrustBadgeProps {
  icon: string;
  label: string;
}

export function TrustBadge({ icon, label }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-btn border border-steel bg-graphite/60">
      <span className="text-lg" aria-hidden="true">{icon}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fog leading-tight">
        {label}
      </span>
    </div>
  );
}
