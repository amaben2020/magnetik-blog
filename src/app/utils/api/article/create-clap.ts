import prisma from "prisma/db";

export const createClap = async (articleId: string, clap: number) => {
  console.log(clap);

  if (clap > 10) {
    throw Error("Clap cannot exceed 10");
  }

  console.log("clap 👏🏾", clap);

  const userClapUpdate = await prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      clap: clap > 10 ? 10 : clap,
    },
  });
  console.log("userClapUpdate", userClapUpdate);

  return userClapUpdate;
};
