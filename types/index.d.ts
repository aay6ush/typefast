import { Dispatch, ReactNode, SetStateAction } from "react";

export declare type ModesProps = {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  modeOption: number;
  setModeOption: Dispatch<SetStateAction<number>>;
};

export declare type ResultProps = {
  wpm: number;
  accuracy: number;
  time: number;
  wpmData: { time: number; wpm: number }[];
  onRestart: () => void;
  mode: string;
  modeOption: number;
};

export type StatCardProps = {
  icon: ReactNode;
  title: string;
  value: string | number;
  color: string;
};

export type AddTestTypes = Omit<ResultProps, "onRestart" | "wpmData">;

export type ProfileHeaderProps = {
  image: string;
  name: string;
  level: number;
  xp: number;
};

export type XPProgressProps = {
  level: number;
  xp: number;
  xpToNextLevel: number;
};

export type StatsGridProps = {
  stats: {
    averageWpm: number;
    averageAccuracy: number;
    testsCompleted: number;
    totalTimeTyping: string;
  };
};

export type BestScoresProps = {
  allTimeBestScores: {
    time: {
      "15s": number;
      "30s": number;
    };
    words: {
      "10": number;
      "25": number;
      "50": number;
    };
  };
};

export type AchievementsProps = {
  data: {
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    title: string;
    description: string;
    achieved: boolean;
  }[];
};

export type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type LeaderboardDataType = {
  rank: number;
  name: string;
  wpm: number;
  accuracy: number;
  time: number;
  mode: string;
};
