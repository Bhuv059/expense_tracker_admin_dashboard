import { Card, CardContent } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const page = async () => {
  const user = await currentUser();

  return (
    <>
      <h1 className="text-xl font-semibold  ">
        <span className="text-xl font-semibold  text-cyan-700  dark:text-cyan-500">
          Profile
        </span>
      </h1>
      <div className=" relative overflow-x-auto shadow-md sm:rounded-lg h-[400px] w-[400px] ">
        <div className="">
          <Card className="h-[400px] bg-slate-100 dark:bg-slate-800 p-5">
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
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Date of Birth
                      </th>
                      <td className="px-6 py-4">{user?.firstName}</td>
                    </tr>{" "}
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Sex
                      </th>
                      <td className="px-6 py-4">White</td>
                    </tr>{" "}
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Email
                      </th>
                      <td className="px-6 py-4">White</td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Phone
                      </th>
                      <td className="px-6 py-4">Black</td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Address
                      </th>
                      <td className="px-6 py-4">Gray</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default page;
