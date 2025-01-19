"use client";
import { Transaction } from "@/lib/types";
import { addCommas } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { toast } from "react-toastify";
import { deleteTransaction } from "@/lib/actions/userActions";

const TransactionListItem = ({ transaction }: { transaction: Transaction }) => {
  const handleDelete = async (transactionId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!confirmed) return;

    const { message, error } = await deleteTransaction(transactionId);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Transaction deleted Successfully");
    }
  };
  const sign = transaction.amount < 0 ? "-" : "+";
  return (
    <li className="group  md:flex flex-col  mb-4 text-sm  text-center">
      <div className=" grid grid-cols-5  mb-2  group relative ">
        <div className="col-span-4 rounded-md">
          <div
            className={
              transaction.amount < 0
                ? "border-r-4 border-red-500"
                : "border-r-4 border-green-500"
            }
          >
            <div className="flex flex-row p-2  group-hover:bg-cyan-700  group-hover:text-gray-300  justify-between   bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none ">
              <label>{transaction.text}</label>
              <label className="text-right  ">
                {sign}
                {addCommas(Math.abs(transaction.amount))}
              </label>
            </div>
          </div>
        </div>
        <div className="invisible group-hover:visible group-hover: w-[35px]   group-hover:bg-cyan-700  group-hover:text-gray-300   bg-gray-200 text-black">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDelete(transaction.id)}
            className="border-0  hover:opacity-100 text-right   bg-gray-200 text-black   group-hover:bg-cyan-700  group-hover:text-gray-300 "
          >
            <TrashIcon className="h-4 " />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default TransactionListItem;
