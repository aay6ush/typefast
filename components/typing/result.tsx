"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Activity, Target, Clock, RotateCcw, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ResultProps, StatCardProps } from "@/types";
import { useEffect } from "react";
import { addTest } from "@/actions/test";
import axios from "axios";

const Result = ({
  wpm,
  accuracy,
  time,
  wpmData,
  onRestart,
  mode,
  modeOption,
}: ResultProps) => {
  useEffect(() => {
    const saveTest = async () => {
      try {
        if (!wpm || !accuracy || !time || !mode || !modeOption) return;
        await addTest({
          wpm,
          accuracy: parseFloat(accuracy.toFixed(2)),
          time,
          mode,
          modeOption,
        });
      } catch (error) {
        console.error("Failed to save test result:", error);
      }
    };

    const addToLeaderboard = async () => {
      try {
        if (!wpm || !accuracy || !time || !mode || !modeOption) return;
        await axios.post(`/api/leaderboard`, {
          wpm,
          accuracy: parseFloat(accuracy.toFixed(2)),
          time,
          mode,
        });
      } catch (error) {
        console.error("Failed to add to leaderboard:", error);
      }
    };

    saveTest();
    addToLeaderboard();
  });

  const averageWPM = Math.round(
    wpmData.reduce((sum, data) => sum + data.wpm, 0) / wpmData.length
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-5xl mx-auto space-y-8 pb-8 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        <StatCard
          icon={<Activity className="w-6 h-6" />}
          title="WPM"
          value={wpm}
          color="text-emerald-400"
        />
        <StatCard
          icon={<Target className="w-6 h-6" />}
          title="Accuracy"
          value={`${accuracy.toFixed(2)}%`}
          color="text-sky-400"
        />
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          title="Time"
          value={`${time}s`}
          color="text-violet-400"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-neutral-900/50 border-neutral-800 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold flex items-center space-x-2 text-gray-100">
              <TrendingUp className="w-5 h-5" />
              <span>Performance Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pr-10">
            <ChartContainer
              config={{
                wpm: {
                  label: "WPM",
                  color: "hsl(142, 71%, 45%)",
                },
                average: {
                  label: "Average WPM",
                  color: "hsl(47, 100%, 68%)",
                },
              }}
              className="h-[300px] sm:h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={wpmData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    opacity={0.1}
                  />
                  <XAxis
                    dataKey="time"
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => `${value}s`}
                    opacity={0.5}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    domain={["dataMin - 5", "dataMax + 5"]}
                    opacity={0.5}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-neutral-800 p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-neutral-200">
                                  Time
                                </span>
                                <span className="font-bold text-neutral-200">
                                  {payload[0].payload.time}s
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-neutral-200">
                                  WPM
                                </span>
                                <span className="font-bold text-neutral-200">
                                  {payload[0].payload.wpm}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine
                    y={averageWPM}
                    stroke="hsl(47, 100%, 68%)"
                    strokeDasharray="15"
                    label={{
                      value: `Avg: ${averageWPM} WPM`,
                      fill: "hsl(47, 100%, 68%)",
                      fontSize: 12,
                      position: "insideBottomRight",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="wpm"
                    stroke="hsl(142, 71%, 45%)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                      r: 6,
                      fill: "hsl(142, 71%, 45%)",
                      stroke: "hsl(var(--background))",
                      strokeWidth: 2,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center">
        <Button
          onClick={onRestart}
          className="flex items-center justify-center space-x-2"
          size="lg"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          <span>Try Again</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

const StatCard = ({ icon, title, value, color }: StatCardProps) => {
  return (
    <Card className="bg-neutral-900/50 border-neutral-800 shadow-md transition-all duration-300 hover:shadow-lg">
      <CardContent className="flex items-center p-6">
        <div className={`mr-4 ${color}`}>{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-400 uppercase">{title}</p>
          <p className="text-3xl font-bold text-gray-100">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Result;
