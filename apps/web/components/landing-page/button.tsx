import { PrimaryButtonProps } from "@/types";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

const PrimaryButton = ({ text, icon }: PrimaryButtonProps) => {
  return (
    <Button size="lg" asChild className="bg-emerald-600 hover:bg-emerald-700">
      <Link href="/type">
        {text} {icon}
      </Link>
    </Button>
  );
};

export default PrimaryButton;
