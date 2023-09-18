import prisma from "prisma/db";

export const getUser = async (clerkId: string) => {
  try {
    const users = await prisma.user.findFirst({
      where: {
        clerkId,
      },
    });

    return users;
  } catch (error) {
    console.log("ERROR", error);
  }
};
