import { Dispatch, JSX, ReactNode, SetStateAction } from "react";
import WebSocket from "ws";

type Room = {
  mode: string;
  modeOption: number;
  name: string;
  id: string;
  code: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

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

export type FeatureCardProps = {
  icon: JSX.Element;
  title: string;
  description: string;
};

export type TestimonialCardProps = {
  name: string;
  username: string;
  image: string;
  tweet: string;
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
  recentTests: { date: string | undefined; wpm: number }[];
};

export type LeaderboardEntry = Omit<LeaderboardDataType, "rank">;

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
  isRaceStarted: boolean;
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
  isRaceStarted: boolean;
  setIsRaceStarted: Dispatch<React.SetStateAction<boolean>>;
  roomData: Room | null;
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

export type User = {
  userId: string;
  name: string;
  image: string | null;
  ws: WebSocket;
  rooms: string[];
};
