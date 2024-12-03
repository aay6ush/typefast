import {
  Award,
  BarChart2,
  Clock,
  Crown,
  Keyboard,
  Swords,
  User,
  Users,
  Zap,
} from "lucide-react";

export const modes = ["time", "words"];
export const timeOptions = [15, 30];
export const wordOptions = [10, 25, 50];

export const DEFAULT_TEST_MODE = "time";
export const DEFAULT_TEST_MODE_OPTION = 15;

export const publicRoutes = ["/", "/leaderboard", "/type"];
export const authRoutes = ["/auth", "/auth/verification"];
export const apiAuthPrefix = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT = "/type";

export const XP_PER_TEST = 10;

export const FEATURES = [
  {
    icon: <Zap className="size-10 text-emerald-500" />,
    title: "Real-time Feedback",
    description: "Get instant feedback of your typing speed, and accuracy.",
  },
  {
    icon: <Users className="size-10 text-emerald-500" />,
    title: "Challenge Friends",
    description: "Compete with friends in real-time typing races.",
  },
  {
    icon: <BarChart2 className="size-10 text-emerald-500" />,
    title: "Detailed Analytics",
    description: "Track your progress over time with comprehensive statistics.",
  },
  {
    icon: <Clock className="size-10 text-emerald-500" />,
    title: "Customizable Practice",
    description:
      "Choose from various typing modes and levels to suit your needs.",
  },
  {
    icon: <Award className="size-10 text-emerald-500" />,
    title: "Achievements",
    description: "Earn badges and rewards as you improve your typing skills.",
  },
  {
    icon: <Zap className="size-10 text-emerald-500" />,
    title: "Sleek Interface",
    description: "Enjoy a minimalist design that enhances your focus.",
  },
];

export const DEFAULT_STATS = [
  { number: 1260, label: "Keystrokes Typed", suffix: "+" },
  { number: 50, label: "Users Registered", suffix: "+" },
  { number: 234, label: "Tests Completed", suffix: "+" },
];

export const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "TypeFast has dramatically improved my typing speed. I've gone from 40 WPM to over 80 WPM in just a month!",
    author: "Sarah L.",
  },
  {
    quote:
      "The real-time feedback and analytics have been crucial in identifying and correcting my typing mistakes.",
    author: "Michael R.",
  },
  {
    quote:
      "Challenging friends has made practicing typing so much more fun and engaging. I look forward to it every day!",
    author: "Emily T.",
  },
];

export const NAVLINKS = [
  {
    id: 1,
    name: "Type",
    href: "/type",
    icon: Keyboard,
  },
  {
    id: 2,
    name: "Multiplayer",
    href: "/multiplayer",
    icon: Swords,
  },
  {
    id: 3,
    name: "Leaderboard",
    href: "/leaderboard",
    icon: Crown,
  },
  {
    id: 4,
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

export const REDIS_URL = process.env.REDIS_URL ?? "redis://localhost:6379";
