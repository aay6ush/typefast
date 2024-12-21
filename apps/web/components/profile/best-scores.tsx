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
import { Trophy, Clock, Type, Hourglass } from "lucide-react";
import StatCard from "./stat-card";
import { BestScoresProps } from "@repo/common/types";

const BestScores = ({ allTimeBestScores }: BestScoresProps) => {
  const { time, words } = allTimeBestScores;

  return (
    <div>
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-2xl">
            <Trophy className="size-8 text-yellow-400" />
            <span className="text-neutral-200">All-Time Best Scores</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="time" className="w-full">
            <TabsList className="bg-neutral-800">
              <TabsTrigger
                value="time"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-neutral-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-50 data-[state=active]:shadow-sm"
              >
                <Hourglass className="mr-2 size-5" />
                Time Mode
              </TabsTrigger>
              <TabsTrigger
                value="words"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-neutral-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-50 data-[state=active]:shadow-sm"
              >
                <Type className="mr-2 size-5" />
                Words Mode
              </TabsTrigger>
            </TabsList>
            <TabsContent value="time">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <StatCard
                  icon={<Hourglass className="size-8 mr-2 text-sky-400" />}
                  title="15 Seconds"
                  value={`${time["15s"]} WPM`}
                />
                <StatCard
                  icon={<Hourglass className="size-8 mr-2 text-sky-400" />}
                  title="30 Seconds"
                  value={`${time["30s"]} WPM`}
                />
              </div>
            </TabsContent>
            <TabsContent value="words">
              <div className="grid grid-cols-3 gap-4 mt-4">
                <StatCard
                  icon={<Type className="size-8 mr-2 text-violet-400" />}
                  title="10 Words"
                  value={`${words["10"]} WPM`}
                />
                <StatCard
                  icon={<Type className="size-8 mr-2 text-violet-400" />}
                  title="25 Words"
                  value={`${words["25"]} WPM`}
                />
                <StatCard
                  icon={<Type className="size-8 mr-2 text-violet-400" />}
                  title="50 Words"
                  value={`${words["50"]} WPM`}
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
