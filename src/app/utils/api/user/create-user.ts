import prisma from "prisma/db";
import { UserButton, useAuth } from "@clerk/nextjs";
const createUser = async () => {
  try {
    const user = await prisma.user.create({
      data: {
        //TODO: create user
      },
    });
  } catch (error) {
    console.log("Error", error);
  }
};
