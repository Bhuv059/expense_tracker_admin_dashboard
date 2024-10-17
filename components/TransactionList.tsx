import { getTransaction } from "@/lib/actions/userActions";
import { Transaction } from "@/lib/types";
import React from "react";
import TransactionListItem from "./TransactionListItem";
import { Card, CardContent } from "./ui/card";

const TransactionList = async () => {
  const { transactions, error } = await getTransaction();

  return (
    <>
      <Card className="h-[350px] bg-slate-100 dark:bg-slate-800 p-5">
        <CardContent>
          <h3 className="h3">Trasactions List</h3>

          <div className="md:flex flex-col mt-2">
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

            <div className=" md:flex md:items-right">
              <div className="md:w-80"></div>
              <button className="shadow  bg-cyan-700  hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Next
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionList;
