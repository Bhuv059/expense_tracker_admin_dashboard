import { SignInButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "@/components/ui/button";

const Guest = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center ">
        Expense Tracker Admin System
      </h1>
      <br />
      <p className="text-lg font-light text-center ">
        Please sign in to manage your transactions
      </p>
      <div className=" flex flex-row  justify-center items-center ">
        <Button className="h-[25px] w-[65px] bg-slate-400 text-black font-bold hover:bg-slate-300">
          <SignInButton />
        </Button>
      </div>
    </div>
  );
};

export default Guest;
