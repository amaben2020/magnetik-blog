// no need for try/catch due to asyncHandler hoc

import prisma from "prisma/db";

export const getArticles = async () => {
  try {
    const data = await prisma.article.findMany({
      include: {
        author: true,
        categories: true,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
