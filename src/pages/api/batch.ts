import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface DataTypes {
  bach_model: string;
  date: string;
  quantity: number;
  license: number;
  comment: string;
}

export default async function batch(req: any, res: any) {
  const { method } = req;

  switch (method) {
    case "POST":
      const form: DataTypes = req.body;
      const parsedDate = new Date(form.date);
      console.log(parsedDate);
      if(form.bach_model != "" && form.quantity > 0 && form.license >= 0 ){
        const postData = await prisma.bach.create({
          data: {
            bach_model: form.bach_model,
            date: parsedDate,
            quantity: form.quantity,
            license: form.license,
            comment: form.comment,
          }
        });
        res.status(200).send(postData);
      } else{
        res.status(400).send("data not valid");
      }

       
      break;
    default:
      const getData = await prisma.bach.findMany({});  
      res.status(200).send("data saved");
      break;
  }
}
