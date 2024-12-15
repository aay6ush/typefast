import { Progress } from "@repo/ui/components/ui/progress";
import { XPProgressProps } from "@/types";

const XPProgress = ({ level, xp, xpToNextLevel }: XPProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">Level {level}</span>
        <span className="text-sm text-gray-400">
          {xp} / {xpToNextLevel} XP
        </span>
        <span className="text-sm text-gray-400">Level {level + 1}</span>
      </div>
      <div className="relative pt-1">
        <Progress value={(xp / xpToNextLevel) * 100} className="h-2" />
      </div>
    </div>
  );
};

export default XPProgress;
