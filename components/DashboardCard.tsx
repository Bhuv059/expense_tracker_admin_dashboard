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
        <div className="grid grid-cols-1  place-content-center   ">
          <h3 className={`h3 ${cssClass && cssClass} `}>{title}</h3>

          <div
            className={`mx-auto  mt-2 inline-flex font-semibold  text-cyan-700 dark:text-cyan-500 ${
              cssClass && cssClass
            } `}
          >
            <span className="">{icon}</span>
            <h3
              className={` text-sm lg:text-xl  font-semibold  text-cyan-700 dark:text-cyan-500 text-center  ${
                cssClass && cssClass
              } `}
            >
              {count}
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
