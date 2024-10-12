"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Transaction } from "@/lib/types";

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

export async function getTransaction(): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
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
