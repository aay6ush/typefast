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
  timeElapsed: number;
  wpmData: { time: number; wpm: number }[];
  onRestart: () => void;
};

export type StatCardProps = {
  icon: ReactNode;
  title: string;
  value: string | number;
  color: string;
};
