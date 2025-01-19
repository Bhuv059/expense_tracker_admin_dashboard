import ProfileDetails from "@/components/ProfileDetails";
import { Card, CardContent } from "@/components/ui/card";
import { getUserProfile } from "@/lib/actions/userActions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await currentUser();
  const { profile, error } = await getUserProfile();

  return (
    <>
      <div className=" relative overflow-x-auto shadow-md sm:rounded-lg h-[550px] w-[500px] max-md:w-full sm:items-center ">
        <div className="">
          <Card className="h-[550px] bg-slate-100 dark:bg-slate-800 p-5">
            <CardContent>
              <div className="mt-2 flex  flex-row gap-5 justify-center items-center  text-cyan-700 dark:text-cyan-500 ">
                <h1 className="text-xl font-semibold  ">
                  <span className="text-xl font-semibold  text-cyan-700  dark:text-cyan-500">
                    Profile Data
                  </span>
                </h1>
              </div>
              <div className="mt-5 flex  flex-row gap-5 justify-center items-center  text-cyan-700 dark:text-cyan-500 ">
                <Image
                  src={user?.imageUrl? user.imageUrl : "/img/user.png",}
                  alt="ExpenseTracker"
                  width={40}
                  height={40}
                />
                <h3 className="text-3xl lg:text-5xl  font-semibold  text-cyan-700 dark:text-cyan-500">
                  {user?.firstName} {user?.lastName}
                </h3>
              </div>

              <div className="mt-5 flex flex-1 ">
                <ProfileDetails profileDetails={JSON.stringify(profile)} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default page;
