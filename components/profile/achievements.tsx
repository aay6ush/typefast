import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AchievementsProps } from "@/types";
import { Medal } from "lucide-react";

const Achievements = ({ data }: AchievementsProps) => {
  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Medal className="w-5 h-5 text-yellow-500" />
          <span className="text-neutral-200">Achievements</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((achievement, index) => (
            <Card
              key={index}
              className="bg-neutral-800/50 border-neutral-700 transition-all duration-300 hover:bg-neutral-700/50"
            >
              <CardContent className="flex items-center space-x-4 p-6">
                <div className="p-2 bg-neutral-700 rounded-lg">
                  <achievement.icon className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-50">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Achievements;
