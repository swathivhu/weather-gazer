import type { LucideIcon } from "lucide-react";

type DetailCardProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
};

export default function DetailCard({ icon: Icon, label, value }: DetailCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-4 flex flex-col justify-between gap-2 text-white">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-white/70" />
        <h4 className="text-sm font-medium text-white/80">{label}</h4>
      </div>
      <p className="text-2xl sm:text-3xl font-semibold">{value}</p>
    </div>
  );
}
