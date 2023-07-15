// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getPrismaInstance from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { table } = req.query;
    const prisma = getPrismaInstance();
    if (table !== "") {
      // @ts-ignore
      const results = await prisma[table! as keyof typeof prisma].findMany();
      console.log("fetch result: ", results);
      res.status(200).json({ results });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
