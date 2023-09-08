import prisma from "prisma/db";

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    console.log("ERROR", error);
  }
};
