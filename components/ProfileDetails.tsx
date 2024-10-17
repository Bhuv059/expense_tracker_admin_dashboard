"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditUserProfile } from "@/lib/actions/userActions";
import { toast } from "react-toastify";

interface Props {
  profileDetails?: string;
}
const ProfileDetails = ({ profileDetails }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const parsedProfileDetails =
    profileDetails && JSON.parse(profileDetails || "");

  const UserSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    phone: z.string().min(6, {
      message: "Password must be of 6 character",
    }),
    address: z.string().min(6, {
      message: "Address must be of 6 character",
    }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: parsedProfileDetails?.name || "",
      email: parsedProfileDetails?.email || "",
      phone: parsedProfileDetails?.phone || "",
      address: parsedProfileDetails?.address || "",
    },
  });

  // 2. Define a submit handler.
  const handleSubmit = async (values: z.infer<typeof UserSchema>) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await EditUserProfile({
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        path: pathname,
      });
      if (error) {
        toast.error(error);
      } else {
        toast.success("Transaction Success");
        router.back();
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10 w-[600px] border-green-700">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-2">
          <table className="  w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="tr">
                <th scope="row" className="th">
                  Name
                </th>
                <td className="px-1 py-2 ">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormControl className="mt-3.5">
                          <Input
                            //className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border  "
                            type="text"
                            id="name"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="tracking-wide text-red-500" />
                      </FormItem>
                    )}
                  />
                </td>
              </tr>

              <tr className="tr">
                <th scope="row" className="th">
                  Email
                </th>
                <td className="px-1 py-2 ">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormControl className="mt-3.5">
                          <Input
                            //className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border  "
                            type="text"
                            id="email"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="tracking-wide text-red-500" />
                      </FormItem>
                    )}
                  />
                </td>
              </tr>
              <tr className="tr">
                <th scope="row" className="th">
                  Phone
                </th>
                <td className="px-1 py-1 ">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormControl className="mt-3.5">
                          <Input
                            //className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border  "
                            type="text"
                            id="phone"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="tracking-wide text-red-500" />
                      </FormItem>
                    )}
                  />
                </td>
              </tr>
              <tr className="tr">
                <th scope="row" className="th">
                  Address
                </th>
                <td className=" py-1">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormControl className="mt-3.5">
                          <Input
                            //className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border  "
                            type="text"
                            id="address"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="tracking-wide text-red-500" />
                      </FormItem>
                    )}
                  />
                </td>
              </tr>

              <tr className=" bg-slate-100 dark:bg-slate-800">
                <th scope="row" className="th"></th>
                <td className=" py-1">
                  <div className="float-right">
                    <button
                      type="submit"
                      className=" shadow  bg-cyan-700  hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    >
                      Save
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Form>
    </div>
  );
};

export default ProfileDetails;
