import { getTransaction } from "@/lib/actions/userActions";
import { Transaction } from "@/lib/types";
import React from "react";
import TransactionListItem from "./TransactionListItem";
import { Card, CardContent } from "./ui/card";

const TransactionList = async () => {
  const { transactions, error } = await getTransaction();

  return (
    <>
      <Card className="h-[320px] bg-slate-100 dark:bg-slate-800 p-5">
        <CardContent>
          <h3 className="text-3xl lg:text-5xl  font-semibold  text-cyan-700 dark:text-cyan-500 text-center mb-2">
            Trasaction Details
          </h3>

          <div className="md:flex flex-col  mb-6">
            <ul className=" w-full">
              {transactions &&
                transactions.map((transaction: Transaction) => (
                  <TransactionListItem transaction={transaction} />
                ))}
              {transactions?.length === 0 && (
                <div className="md:flex flex-col  mt-7">
                  <div>
                    <label className=" bg-gray-200 text-gray-500 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                      No transaction is made yet
                    </label>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionList;
