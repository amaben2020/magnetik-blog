// no need for try/catch due to asyncHandler hoc

//TODO: typescript fix for this file, research connect and connectAndCreate
import prisma from "prisma/db";
import { getCategoriesIdsByNames } from "../category/get-category-ids-by-names";

export const createArticle = async (
  content: string,
  authorId: number,
  published: boolean,
  categories: string[],
) => {
  try {
    const categoryIds = await getCategoriesIdsByNames(categories);

    const data = await prisma.article.create({
      data: {
        content,
        authorId: Number(authorId),
        published,

        categories: {
          connect: categoryIds?.map((categoryId: any) => ({
            id: categoryId,
          })),
        },
      },
      include: {
        categories: true,
      },
    });

    // always ensure your API handlers return something to prevent a 500
    return data;
  } catch (error) {
    console.log("Error", error);
  } finally {
    await prisma.$disconnect();
  }
};
