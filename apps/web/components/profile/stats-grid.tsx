import { BarChart3, Clock, Target, Zap } from "lucide-react";
import StatCard from "./stat-card";
import { StatsGridProps } from "@/types";

const StatsGrid = ({ stats }: StatsGridProps) => {
  const { averageWpm, averageAccuracy, testsCompleted, totalTimeTyping } =
    stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard
        icon={<Zap className="w-5 h-5" />}
        title="Average WPM"
        value={averageWpm}
        color="text-emerald-400"
      />
      <StatCard
        icon={<Target className="w-5 h-5" />}
        title="Accuracy"
        value={`${averageAccuracy}%`}
        color="text-sky-400"
      />
      <StatCard
        icon={<BarChart3 className="w-5 h-5" />}
        title="Tests Completed"
        value={testsCompleted}
        color="text-violet-400"
      />
      <StatCard
        icon={<Clock className="w-5 h-5" />}
        title="Time Typing"
        value={totalTimeTyping}
        color="text-amber-400"
      />
    </div>
  );
};

export default StatsGrid;
