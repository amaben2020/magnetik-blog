import prisma from "prisma/db";

export const createClap = async (articleId: string, clap: number) => {
  const userClapUpdate = await prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      clap: clap,
    },
  });
  console.log("userClapUpdate", userClapUpdate);

  return userClapUpdate;
};
