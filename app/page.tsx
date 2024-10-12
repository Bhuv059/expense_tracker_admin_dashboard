import React from "react";
import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";
import Balance from "@/components/Balance";
import AddTransaction from "@/components/AddTransaction";
import TransactionList from "@/components/TransactionList";
import IncomeExpense from "@/components/IncomeExpense";

const Home = async () => {
  const user = await currentUser();

  if (!user) return <Guest />;
  return (
    <>
      <div>
        <h1 className="text-xl font-semibold  ">
          <span className="text-xl font-semibold  text-gray-700  dark:text-gray-400">
            Welcome {user?.firstName} {user?.lastName}
          </span>
        </h1>

        <div className=" grid grid-cols-1  md:grid-cols-2 gap-4 p-4">
          <Balance />
          <IncomeExpense />
          <AddTransaction />
          <TransactionList />
        </div>
      </div>
    </>
  );
};
export default Home;
