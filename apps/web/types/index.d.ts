import { Room } from "@prisma/client";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type ModesProps = {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  modeOption: number;
  setModeOption: Dispatch<SetStateAction<number>>;
};

export type ResultProps = {
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

export type TestimonialCardProps = {
  name: string;
  username: string;
  image: string;
  tweet: string;
};

export type PrimaryButtonProps = {
  text: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  iconPosition: "left" | "right";
};

export type LeaderboardDataType = {
  rank: number;
  name: string;
  wpm: number;
  accuracy: number;
  time: number;
  mode: string;
};

export type RecentPerformanceProps = {
  recentTests: { date: string; wpm: number }[];
};

type LeaderboardEntry = Omit<LeaderboardDataType, "rank">;

export type Message = {
  id: string;
  sender: {
    name: string;
    image: string | null;
  };
  text: string;
};

export type Member = {
  id: string;
  name: string;
  image: string;
  isHost: boolean;
  progress?: {
    wpm: number;
    accuracy: number;
    progress: number;
  };
};

export type PublicRoomsProps = {
  rooms: Room[];
};

export type MultiplayerHeaderProps = {
  roomData: Room | null;
  isHost: boolean;
  isRaceActive: boolean;
  countdown: number | null;
};

export type RoomSettingsProps = {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
};

export type MembersProps = {
  members: Member[];
};

export type MemberAvatarProps = { name: string; image: string };

export type RaceProps = {
  members: Member[];
  isRaceActive: boolean;
  roomData: Room | null;
  countdown: number | null;
  raceText: string;
};

export type MemberProgressProps = {
  member: Member;
};

export type ChatProps = {
  code: string;
};

export type ChatMessageProps = {
  message: Message;
};

export type InterfaceProps = {
  mode: string;
  modeOption: number;
  text: string;
  onProgress: (wpm: number, accuracy: number, progress: number) => void;
};
