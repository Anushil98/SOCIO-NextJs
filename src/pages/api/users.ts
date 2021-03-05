import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getRepository } from "typeorm";
import initializeDatabase from "../../../config/db/dbConnect";
import User from "../../Db/entities/User.entity";

const handler = nc<NextApiRequest, NextApiResponse>()
  .post(async (req, res) => {
    await initializeDatabase();
    const { body } = req;
    const username = body.username;
    const user = new User();
    user.username = username;
    const savedUser = await getRepository(User).save(user);
    res.json({ ...savedUser, message: "User created SuccessFully" });
  });

export default handler;