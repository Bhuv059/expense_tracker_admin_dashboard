"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { formUrlQuery } from "@/lib/utils";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams?.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });
    router.push(newUrl);
  };
  return (
    <>
      <div className=" grid grid-row-1  place-content-center  ">
        <div className="  flex flex-1 gap-10 place-content-center ">
          <Button
            onClick={() => handleNavigation("prev")}
            disabled={pageNumber === 1}
            className="shadow  bg-cyan-700  hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            <p className="body-medium text-dark200_light800">Prev</p>
          </Button>

          <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
            <p className="body-semibold text-light-900">{pageNumber}</p>
          </div>

          <Button
            onClick={() => handleNavigation("next")}
            disabled={isNext === false}
            className="shadow  bg-cyan-700  hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            <p className="body-medium text-dark200_light800">Next</p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
