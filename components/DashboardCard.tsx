import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  count: string;
  icon: React.ReactElement<LucideIcon>;
  cssClass?: string;
}

const DashboardCard = ({
  title,
  count,
  icon,
  cssClass,
}: DashboardCardProps) => {
  console.log("cssClass");
  console.log(cssClass);
  return (
    <Card className="h-[100px] w-full bg-slate-100 dark:bg-slate-800 p-5">
      <CardContent>
        <h3
          className={` text-3xl  text-center font-bold text-cyan-700 dark:text-cyan-500 ${
            cssClass && cssClass
          } `}
        >
          {title}
        </h3>
        <div
          className={` flex gap-1  justify-center items-center  text-cyan-700 dark:text-cyan-500 ${
            cssClass && cssClass
          } `}
        >
          {icon}
          <h3
            className={`text-xl lg:text-5xl  font-semibold  text-cyan-700 dark:text-cyan-500 ${
              cssClass && cssClass
            } `}
          >
            {count}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
