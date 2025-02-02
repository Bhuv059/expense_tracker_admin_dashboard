"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import {
  EditUserFormData,
  GetTransactionParams,
  Transaction,
  UserEditResult,
  UserProfile,
} from "@/lib/types";

async function getUserBalance(): Promise<{ balance?: number; error?: string }> {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });
    const balance = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    revalidatePath("/");
    return { balance };
  } catch (error) {
    return { error: "Database error" };
  }
}

export default getUserBalance;

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

export async function addTransaction(
  formData: FormData
): Promise<TransactionResult> {
  const textValue = formData.get("text");
  const amountValue = formData.get("amount");
  //check for input values
  if (!textValue || textValue === "" || !amountValue) {
    return { error: " Text or amount is missing" };
  }

  const text: string = textValue.toString();
  const amount: number = parseFloat(amountValue.toString());

  //Get logged in user
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }
  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: { text, amount, userId },
    });
    revalidatePath("/");
    return { data: transactionData };
  } catch (error) {
    return { error: "Transaction not added" };
  }
}

export async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) return { error: "User not found" };

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });

    const amounts = transactions.map((transaction) => transaction.amount);

    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => acc + item, 0);

    const expense = amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => acc + item, 0);

    return { income, expense: Math.abs(expense) };
  } catch (error) {
    return { error: "Database error" };
  }
}

export async function getTransaction(params: GetTransactionParams): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  let { page = 0, pageSize = 1, searchQuery, filter = 0, pathName } = params;

  const { userId } = auth();
  let limit = 0;

  if (!userId) {
    return { error: "User not found" };
  }
  if (filter && filter === "Dashboard") pageSize = 4;

  try {
    const transactions = await db.transaction.findMany({
      /*  skip: (page - 1) * pageSize,
      take: limit ? 2 : pageSize,
      */
      skip: page ? (page - 1) * pageSize : 0,
      take: pageSize,
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { transactions };
  } catch (error) {
    return { error: "Database error" };
  }
}

export async function deleteTransaction(
  transactionId: string
): Promise<{ message?: string; error?: string }> {
  const { userId } = auth();

  if (!userId) return { error: "User not found" };

  try {
    const transaction = await db.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    });

    revalidatePath("/");

    return { message: "Transaction deleted" };
  } catch (error) {
    return { error: "Database error: Transaction not deleted" };
  }
}

export interface GetUserProfileResult {
  profile?: UserProfile;
  error?: string;
}

export async function getUserProfile(): Promise<GetUserProfileResult> {
  const { userId } = auth();
  if (!userId) return { error: "User not found" };
  try {
    const profile = await db.user.findFirst({
      where: {
        clerkUserId: userId,
      },
    });
    // @ts-ignore

    return { profile };
  } catch (error) {
    return { error: "Database error: Unable to get user profile" };
  }
}

export async function profileId() {
  const { userId } = auth();
  if (!userId) return { error: "User not found" };

  try {
  } catch (error) {
    return { error: "Database error: User profile not updated" };
  }
}

export async function EditUserProfile(
  formData: EditUserFormData
): Promise<UserEditResult> {
  const nameValue = formData.name;
  const emailValue = formData.email;
  const phoneValue = formData.phone;
  const addressValue = formData.address;

  //check for input values
  if (
    !nameValue ||
    !emailValue ||
    emailValue === "" ||
    !phoneValue ||
    phoneValue === "" ||
    !addressValue ||
    addressValue === ""
  ) {
    return { error: " Please enter the missing value" };
  }

  const name: string = nameValue.toString();
  const email: string = emailValue.toString();
  const phone: string = phoneValue.toString();
  const address: string = addressValue.toString();

  //Get logged in user
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }
  try {
    await db.user.update({
      data: { name, email, phone, address },
      where: {
        clerkUserId: userId,
      },
    });
    revalidatePath("/");
    return { data: "Profile data updated successfully" };
  } catch (error) {
    return { error: "User not updated!" };
  }
}
