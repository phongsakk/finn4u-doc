import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const connectDB = async () => {
  await prisma.$connect();
};

export const closeDB = async () => {
  await prisma.$disconnect();
};

export default prisma;
