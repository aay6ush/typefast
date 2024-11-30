import { getProfileData } from "@/actions/profile";
import Achievements from "@/components/profile/achievements";
import BestScores from "@/components/profile/best-scores";
import Header from "@/components/profile/header";
import RecentPerformance from "@/components/profile/recent-performance";
import StatsGrid from "@/components/profile/stats-grid";
import XPProgress from "@/components/profile/xp-progress";

const ProfilePage = async () => {
  const { data } = await getProfileData();

  return (
    <main className="w-full max-w-5xl mx-auto space-y-8 p-6">
      <Header
        image={data.image}
        name={data.name}
        level={data.level}
        xp={data.xp}
      />

      <XPProgress
        level={data.level}
        xp={data.xp}
        xpToNextLevel={data.xpToNextLevel}
      />

      <StatsGrid stats={data.stats} />

      <BestScores allTimeBestScores={data.allTimeBestScores} />

      <RecentPerformance recentTests={data.recentTests} />

      <Achievements data={data.achievements} />
    </main>
  );
};

export default ProfilePage;
