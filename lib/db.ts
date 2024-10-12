import { PrismaClient } from "@prisma/client";

// This is a hack to prevent Nextjs to reinitialise prisma over and over again. So we declare prisma globally.
declare global {
  var prisma: PrismaClient | undefined;
}
export const db = globalThis.prisma || new PrismaClient();

// This is not the case with production.
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
