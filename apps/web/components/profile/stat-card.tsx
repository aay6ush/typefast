import { Card, CardContent } from "@repo/ui/components/ui/card";

const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number | string;
}) => {
  return (
    <Card className="bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50">
      <CardContent className="flex items-center p-6 gap-x-2">
        {icon}
        <div>
          <p className="text-sm font-medium text-neutral-400 uppercase">
            {title}
          </p>
          <p className="text-2xl font-bold text-neutral-200">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};
export default StatCard;
