"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { ChevronDown, ChartNoAxesCombined } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { useState } from "react";
import { RecentPerformanceProps } from "@repo/common/types";

const RecentPerformance = ({ recentTests }: RecentPerformanceProps) => {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [timeRange, setTimeRange] = useState("week");

  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-2xl">
            <ChartNoAxesCombined className="size-8 text-yellow-400" />
            <span className="text-neutral-200">Recent Performance</span>
          </div>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-neutral-800 border-neutral-700 text-neutral-200"
                >
                  {chartType === "bar" ? "Bar Chart" : "Line Chart"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-neutral-800 border-neutral-700">
                <DropdownMenuItem
                  className="text-neutral-400 min-w-full cursor-pointer"
                  onClick={() => setChartType("bar")}
                >
                  Bar Chart
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-neutral-400 min-w-full cursor-pointer"
                  onClick={() => setChartType("line")}
                >
                  Line Chart
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-neutral-800 border-neutral-700 text-neutral-200"
                >
                  {timeRange === "week"
                    ? "Last Week"
                    : timeRange === "month"
                      ? "Last Month"
                      : "Last 3 Months"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-neutral-800 border-neutral-700">
                <DropdownMenuItem
                  className="text-neutral-400 min-w-full cursor-pointer"
                  onClick={() => setTimeRange("week")}
                >
                  Last Week
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-neutral-400 min-w-full cursor-pointer"
                  onClick={() => setTimeRange("month")}
                >
                  Last Month
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-neutral-400 min-w-full cursor-pointer"
                  onClick={() => setTimeRange("3months")}
                >
                  Last 3 Months
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={recentTests}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  opacity={0.1}
                />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  opacity={0.5}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  opacity={0.5}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-neutral-800 p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-neutral-200">
                                Date
                              </span>
                              <span className="font-bold text-neutral-200">
                                {payload[0]?.payload.date}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-neutral-200">
                                WPM
                              </span>
                              <span className="font-bold text-neutral-200">
                                {payload[0]?.payload.wpm}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="wpm"
                  fill="hsl(142, 71%, 45%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart data={recentTests}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  opacity={0.1}
                />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  opacity={0.5}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  opacity={0.5}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-neutral-800 p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-neutral-200">
                                Date
                              </span>
                              <span className="font-bold text-neutral-200">
                                {payload[0]?.payload.date}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-neutral-200">
                                WPM
                              </span>
                              <span className="font-bold text-neutral-200">
                                {payload[0]?.payload.wpm}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="wpm"
                  stroke="hsl(142, 71%, 45%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(142, 71%, 45%)", r: 4 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPerformance;
