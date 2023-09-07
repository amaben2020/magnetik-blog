import prisma from "prisma/db";
export const createUser = async (email: any, userId: any, name: string) => {
  try {
    if (userId && email && name) {
      console.log("clerkUser?.user.emailAddresses", email, userId, name);
      const user = await prisma.user.create({
        data: {
          name,
          email: email,
          clerkId: userId,
        },
      });

      return user;
    } else {
      return !userId && !email && !name && "User could not be created";
    }
  } catch (error) {
    console.error("Error ❌", error);
  }
};
