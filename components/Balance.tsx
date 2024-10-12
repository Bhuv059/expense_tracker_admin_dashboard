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
        icon={<BadgeDollarSign />}
      />
    </div>
  );
};

export default Balance;
