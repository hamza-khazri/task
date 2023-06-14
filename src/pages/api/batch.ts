import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface DataTypes {
  bach_model: string;
  date: string;
  quantity: number;
  license: number;
  comment: string;
}

export default async function batch(req: NextApiRequest , res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case "POST":
      const form = req.body as DataTypes;
      const parsedDate = new Date(form.date);
      console.log(parsedDate);
      const machines = []
      for(let i = 0; i < form.license; i++) {
        machines.push({
          serial_number: Math.floor(Math.random() * 1000000),
      });
      }
      if(form.bach_model != "" && form.quantity > 0 && form.license >= 0 ){
        const postData = await prisma.bach.create({
          data: {
            bach_model: form.bach_model,
            date: parsedDate,
            quantity: form.quantity,
            license: form.license,
            comment: form.comment,
            machines : {
              create: machines
            }
          }
        });
        res.status(200).send(postData);
      } else{
        res.status(400).send("data not valid");
      }
      break;
    default:
      const getData = await prisma.bach.findMany({});  
      res.status(200).send(getData);
      break;
  }
}
