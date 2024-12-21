import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { ProfileHeaderProps } from "@repo/common/types";

const Header = ({ image, name }: ProfileHeaderProps) => {
  return (
    <header className="flex items-center space-x-4">
      <Avatar className="size-20 border-4 border-emerald-400">
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
      <h1 className="text-3xl font-bold text-neutral-200">{name}</h1>
    </header>
  );
};

export default Header;
