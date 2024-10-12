"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "@/components/ThemeToggler";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <>
      <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 ">
        <Link href="/">
          <div className="flex flex-1 ">
            <Image
              src="/img/bank.png"
              alt="ExpenseTracker"
              width={40}
              height={40}
            />

            <div className=" flex w-full  justify-end space-x-2  ">
              <div>
                <ModeToggle />
              </div>
              <div className="flex flex-col gap-5  sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                <SignedIn>
                  <div className="mt-2 ">
                    <UserButton />
                  </div>
                </SignedIn>
                <SignedOut>
                  {/* <Button className=" h-[25px] w-[65px] px-3 py-2 bg-slate-400 text-black font-bold hover:bg-slate-50  ">
                    <SignInButton />
                  </Button>
 */}
                  <Button className="h-[25px] w-[65px]  px-3 mt-2 bg-slate-50 text-black font-bold hover:bg-slate-400">
                    <SignUpButton />
                  </Button>
                </SignedOut>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
