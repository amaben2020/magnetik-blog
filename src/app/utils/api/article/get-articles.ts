// no need for try/catch due to asyncHandler hoc

import prisma from "prisma/db";

export const getArticles = async () => {
  try {
    const data = await prisma.article.findMany({
      include: {
        author: true,
      },
    });
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
