//@ts-nocheck

import prisma from "prisma/db";
export const followUser = async (userId: any, followUserId: any) => {
  try {
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
      });

      const followUser = await prisma.user.findUnique({
        where: { clerkId: followUserId },
      });

      // there must be existing users in the db for a follows to happen
      if (!user || !followUser) {
        throw new Error("User not found.");
      }

      // follower: the user that initiated the follow (person that clicked the follow button) if a follower
      // following: the user followed by someone i.e i'm following someone.

      const follow = await prisma.follows.create({
        data: {
          follower: { connect: { id: user.id } },
          following: { connect: { id: followUser.id } },
        },
      });
      console.log("follow", follow);
      return follow;
    } else {
      return !userId && "User could not be created";
    }
  } catch (error) {
    console.error("Error ❌", error);
  }
};
