import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

export const WelcomeUser = async () => {
  const user = await currentUser();
  return (
    <>
      <div className=" flex  flex-row gap-5   text-cyan-700 dark:text-cyan-500 ">
        <h3 className="text-3xl lg:text-5xl  font-semibold  text-cyan-700 dark:text-cyan-500">
          {user?.firstName} {user?.lastName}
        </h3>
      </div>
    </>
  );
};
