import Guest from "@/components/Guest";
import Pagination from "@/components/Pagination";
import TransactionListItem from "@/components/TransactionListItem";
import { Card, CardContent } from "@/components/ui/card";
import { getTransaction } from "@/lib/actions/userActions";
import { PAGESIZE } from "@/lib/contants";
import { currentUser } from "@clerk/nextjs/server";
import { Transaction } from "@prisma/client";
import React from "react";

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}
const page = async ({ searchParams }: SearchParamsProps) => {
  const user = await currentUser();
  if (!user) return <Guest />;

  const { transactions, error } = await getTransaction({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: PAGESIZE,
  });

  return (
    <>
      <div className=" relative overflow-x-auto shadow-md sm:rounded-lg h-[750px] w-[500px] ">
        <div className="">
          <Card className="h-[750px] bg-slate-100 dark:bg-slate-800 p-5">
            <CardContent>
              <div className="mt-2 flex  flex-row gap-5 justify-center items-center  text-cyan-700 dark:text-cyan-500 ">
                <h1 className="text-xl font-semibold  ">
                  <span className="text-xl font-semibold  text-cyan-700  dark:text-cyan-500">
                    Transaction Details
                  </span>
                </h1>
              </div>
              <div className="mt-10 flex flex-1 ">
                {transactions?.length === 0 ? (
                  <div className=" py-5 grid grid-row-1  place-content-center  ">
                    <div className="  flex flex-1 gap-10">
                      <label className=" bg-gray-200 text-gray-500 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                        No transaction is made yet
                      </label>
                    </div>
                  </div>
                ) : (
                  <ul className=" w-full">
                    {transactions &&
                      transactions.map((transaction: Transaction) => (
                        <TransactionListItem transaction={transaction} />
                      ))}
                    <div className=" ">
                      <Pagination
                        pageNumber={searchParams?.page ? +searchParams.page : 1}
                        // @ts-ignore
                        isNext={transactions?.length < PAGESIZE ? false : true}
                      />
                    </div>
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default page;
