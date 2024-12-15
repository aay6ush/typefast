import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { Trophy, Clock, BarChart3 } from "lucide-react";
import StatCard from "./stat-card";
import { BestScoresProps } from "@/types";

const BestScores = ({ allTimeBestScores }: BestScoresProps) => {
  const { time, words } = allTimeBestScores;

  return (
    <div>
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-neutral-200">All-Time Best Scores</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="time" className="w-full">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-800 p-1 text-neutral-300">
              <TabsTrigger
                value="time"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-neutral-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-50 data-[state=active]:shadow-sm"
              >
                <Clock className="mr-2 h-4 w-4" />
                Time Mode
              </TabsTrigger>
              <TabsTrigger
                value="words"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-neutral-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-50 data-[state=active]:shadow-sm"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Words Mode
              </TabsTrigger>
            </TabsList>
            <TabsContent value="time">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <StatCard
                  icon={<Clock className="w-5 h-5" />}
                  title="15 Seconds"
                  value={`${time["15s"]} WPM`}
                  color="text-emerald-400"
                />
                <StatCard
                  icon={<Clock className="w-5 h-5" />}
                  title="30 Seconds"
                  value={`${time["30s"]} WPM`}
                  color="text-emerald-400"
                />
              </div>
            </TabsContent>
            <TabsContent value="words">
              <div className="grid grid-cols-3 gap-4 mt-4">
                <StatCard
                  icon={<BarChart3 className="w-5 h-5" />}
                  title="10 Words"
                  value={`${words["10"]} WPM`}
                  color="text-sky-400"
                />
                <StatCard
                  icon={<BarChart3 className="w-5 h-5" />}
                  title="25 Words"
                  value={`${words["25"]} WPM`}
                  color="text-sky-400"
                />
                <StatCard
                  icon={<BarChart3 className="w-5 h-5" />}
                  title="50 Words"
                  value={`${words["50"]} WPM`}
                  color="text-sky-400"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BestScores;
