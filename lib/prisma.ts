import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

const getPrismaInstance = () => {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }
  return prismaClient;
}

export default getPrismaInstance;