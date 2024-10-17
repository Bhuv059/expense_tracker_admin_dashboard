import React from "react";

import getUserBalance from "@/lib/actions/userActions";
import { addCommas } from "@/lib/utils";
import DashboardCard from "./DashboardCard";
import { BadgeDollarSign } from "lucide-react";

const Balance = async () => {
  const { balance } = await getUserBalance();

  return (
    <div>
      <DashboardCard
        title={"Balance"}
        count={addCommas(Number(balance?.toFixed(2) ?? 0))}
        icon={<BadgeDollarSign className="w-5 h-5" />}
      />
    </div>
  );
};

export default Balance;
