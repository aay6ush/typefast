import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileHeaderProps } from "@/types";

const Header = ({ image, name, level, xp }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="w-20 h-20 border-4 border-emerald-500">
        <AvatarImage src={image} />
        <AvatarFallback>
          {name.split(" ").length === 1
            ? name[0]
            : name
                .split(" ")
                .map((part) => part[0])
                .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-3xl font-bold text-gray-50">{name}</h1>
        <div className="flex items-center space-x-2 text-gray-400">
          <span>Level {level}</span>
          <span>•</span>
          <span>{xp} XP</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
