// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getRepository } from "typeorm";
import initializeDatabase from "../../../config/db/dbConnect";
import User from "../../Db/entities/User.entity";

export default async (req, res) => {
  await initializeDatabase();
  const users = getRepository(User).find();
  // await connection.close();
  return res.status(200).json(users);
}
