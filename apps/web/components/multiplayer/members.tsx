"use client";

import { Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { MemberAvatarProps, MembersProps } from "@repo/common/types";

const Members = ({ members }: MembersProps) => {
  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-3 text-neutral-200 text-2xl">
          <Users className="size-8 text-sky-400" />
          Typists ({members.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[460px]">
          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MemberAvatar name={member.name} image={member.image || ""} />
                  <div>
                    <p className="font-medium text-neutral-200">
                      {member.name}
                    </p>
                    {member.isHost && (
                      <span className="text-xs text-violet-400">Host</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const MemberAvatar = ({ name, image }: MemberAvatarProps) => {
  const initials =
    name.split(" ").length === 1
      ? name[0]
      : name
          .split(" ")
          .map((part) => part[0])
          .join("");

  return (
    <Avatar>
      <AvatarImage src={image || ""} alt={name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

export default Members;
