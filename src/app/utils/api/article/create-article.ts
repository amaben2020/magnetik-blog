// no need for try/catch due to asyncHandler hoc
//@ts-nocheck
//TODO: typescript fix for this file
import prisma from "prisma/db";
import { arraysAreEqual } from "../../arrays-are-equals";

export const createArticle = async (
  content: string,
  authorId: number,
  published: boolean,
  categories: string[],
) => {
  try {
    const categoryInDB = await prisma?.category.findMany();
    // const existingCategory = categoryInDB?.find((post) => {
    //   //@ts-ignore
    //   return categories.every((category) => post.category?.includes(category));
    // });
    // console.log("existingCategory", existingCategory);

    const existingCategory = categoryInDB
      .filter((elem) => arraysAreEqual(elem.category, categories))
      .find((elem) => elem);

    console.log("Are the categories same?", existingCategory);

    if (existingCategory?.id) {
      await prisma.article.create({
        data: {
          content,
          authorId: Number(authorId),
          published,
          categories: {
            connectOrCreate: {
              where: { id: existingCategory?.id },
              create: { category: categories?.map((category) => category) },
            },
          },
        },
        include: {
          categories: true,
        },
      });
    } else {
      await prisma.article.create({
        data: {
          content,
          authorId: Number(authorId),
          published,
          categories: {
            create: { category: categories },
          },
        },
        include: {
          categories: true,
        },
      });
    }

    // if the category exists based on the categories passed from req.body, simply update the category with the next article
  } catch (error) {
    console.log("Error", error);
  } finally {
    await prisma.$disconnect();
  }
};
