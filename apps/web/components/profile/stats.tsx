import { Activity, BarChart3, Clock, Target } from "lucide-react";
import { StatsGridProps } from "@repo/common/types";
import StatCard from "./stat-card";

const StatsGrid = ({ stats }: StatsGridProps) => {
  const { averageWpm, averageAccuracy, testsCompleted, totalTimeTyping } =
    stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard
        icon={<Activity className="size-8 mr-2 text-sky-400" />}
        title="Average WPM"
        value={averageWpm}
      />
      <StatCard
        icon={<Target className="size-8 mr-2 text-emerald-400" />}
        title="Accuracy"
        value={`${averageAccuracy}%`}
      />
      <StatCard
        icon={<BarChart3 className="size-8 mr-2 text-amber-400" />}
        title="Tests Completed"
        value={testsCompleted}
      />
      <StatCard
        icon={<Clock className="size-8 mr-2 text-violet-400" />}
        title="Time Typing"
        value={totalTimeTyping}
      />
    </div>
  );
};

export default StatsGrid;
