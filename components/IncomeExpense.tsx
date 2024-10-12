import React from "react";
import DashboardCard from "./DashboardCard";
import { BadgeDollarSign } from "lucide-react";
import { getIncomeExpense } from "@/lib/actions/userActions";

const IncomeExpense = async () => {
  const { income, expense, error } = await getIncomeExpense();

  return (
    <div className="flex flex-row gap-1  items-start ">
      <div className="w-full grid grid-cols-2  ">
        <DashboardCard
          title={"Income"}
          count={income?.toFixed(2)!}
          icon={<BadgeDollarSign />}
          cssClass="text-green-600"
        />
        <DashboardCard
          title={"Expense"}
          count={expense?.toFixed(2)!}
          icon={<BadgeDollarSign />}
          cssClass="text-red-600"
        />
      </div>
    </div>
  );
};

export default IncomeExpense;
