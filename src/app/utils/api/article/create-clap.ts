import prisma from "prisma/db";

export const createClap = async (articleId: string, clap: number) => {
  await prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      clap,
    },
  });
};
