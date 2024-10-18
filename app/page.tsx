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
      <div className=" grid grid-cols-1  md:grid-cols-2 gap-2   shadow-md sm:rounded-lg">
        <Balance />
        <IncomeExpense />
        <AddTransaction />
        <TransactionList />
        {/*  <AnalyticsChart /> */}
      </div>
    </>
  );
};
export default Home;
