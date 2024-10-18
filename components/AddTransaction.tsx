"use client";

import { addTransaction } from "@/lib/actions/userActions";
import React from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { Card, CardContent } from "./ui/card";

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Transaction Success");
      formRef.current?.reset();
    }
  };

  return (
    <>
      <Card className="h-[400px] bg-slate-100 dark:bg-slate-800 p-5">
        <CardContent>
          <h3 className="h3">Make Trasaction</h3>
          <form ref={formRef} action={clientAction} className="mt-10">
            <div className=" ">
              <div className="md:flex flex-col  mb-10">
                <div>
                  <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4  dark:text-gray-400">
                    Text
                  </label>
                </div>
                <div>
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    id="text"
                    name="text"
                    placeholder="Enter text"
                  ></input>
                </div>
              </div>

              <div className="md:flex flex-col  mb-10">
                <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4  dark:text-gray-400">
                  Amount
                </label>
                <p className=" text-gray-500 text-xs">
                  (negative expense, positive income)
                </p>
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="amount"
                  name="amount"
                  id="amount"
                  step="0.01"
                  placeholder="Enter amount..."
                ></input>
              </div>

              <div className="md:flex md:items-right">
                <div className="md:w-80"></div>
                <button className="shadow  bg-cyan-700  hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                  Save
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddTransaction;
