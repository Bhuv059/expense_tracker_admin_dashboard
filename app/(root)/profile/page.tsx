import { Card, CardContent } from "@/components/ui/card";
import { getUserProfile } from "@/lib/actions/userActions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await currentUser();
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { profile, error } = await getUserProfile();
  return (
    <>
      <h1 className="text-xl font-semibold  ">
        <span className="text-xl font-semibold  text-cyan-700  dark:text-cyan-500">
          Profile
        </span>
      </h1>
      <div className=" relative overflow-x-auto shadow-md sm:rounded-lg h-[550px] w-[550px] ">
        <div className="">
          <Card className="h-[550px] bg-slate-100 dark:bg-slate-800 p-5">
            <CardContent>
              <div className="mt-2 flex  flex-row gap-5 justify-center items-center  text-cyan-700 dark:text-cyan-500 ">
                <Image
                  src="/img/bankLogo.png"
                  alt="ExpenseTracker"
                  width={40}
                  height={40}
                />
                <h3 className="text-3xl lg:text-5xl  font-semibold  text-cyan-700 dark:text-cyan-500">
                  {user?.firstName} {user?.lastName}
                </h3>
              </div>
              <div className="mt-10 flex flex-1 ">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <tbody>
                    <tr className="tr">
                      <th scope="row" className="th">
                        Email
                      </th>
                      <td className="px-6 py-4">{profile?.email}</td>
                    </tr>
                    <tr className="tr">
                      <th scope="row" className="th">
                        Phone
                      </th>
                      <td className="px-6 py-4"> {profile?.phone}</td>
                    </tr>
                    <tr className="tr">
                      <th scope="row" className="th">
                        Address
                      </th>
                      <td className="px-6 py-4">{profile?.address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="py-5  md:items-right mr-0">
                <div className=" bg-blue md:w-80"></div>
                <div className="float-right">
                  <Link href={`/profile/edit/${profile?.id}`}>
                    <button className=" shadow  bg-cyan-700  hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default page;
