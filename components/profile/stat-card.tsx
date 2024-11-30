import { Card, CardContent } from "../ui/card";

const StatCard = ({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  color: string;
}) => {
  return (
    <Card className="bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50">
      <CardContent className="flex items-center p-6">
        <div className={`mr-4 ${color}`}>{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-400 uppercase">{title}</p>
          <p className="text-2xl font-bold text-gray-50">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
