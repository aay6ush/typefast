import { getProfileData } from "@/actions/profile";
import BestScores from "@/components/profile/best-scores";
import Header from "@/components/profile/header";
import RecentPerformance from "@/components/profile/recent-performance";
import StatsGrid from "@/components/profile/stats";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const ProfilePage = async () => {
  const { data } = await getProfileData();

  return (
    <main className="w-full max-w-5xl mx-auto space-y-8 p-6">
      <Header image={data.image} name={data.name} />

      <StatsGrid stats={data.stats} />

      <BestScores allTimeBestScores={data.allTimeBestScores} />

      <RecentPerformance recentTests={data.recentTests} />
    </main>
  );
};

export default ProfilePage;
