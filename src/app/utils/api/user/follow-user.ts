import prisma from "prisma/db";
export const followUser = async (userId: any, followingId: any) => {
  try {
    if (userId) {
      const user = await prisma.user.update({
        where: {
          clerkId: userId,
        },
        data: {
          clerkId: userId,
          following: followingId,
        },
      });

      return user;
    } else {
      return !userId && "User could not be created";
    }
  } catch (error) {
    console.error("Error ❌", error);
  }
};
