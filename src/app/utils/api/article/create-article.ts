// no need for try/catch due to asyncHandler hoc

//TODO: typescript fix for this file
import prisma from "prisma/db";
import { getCategoriesIdsByNames } from "../category/get-category-ids-by-names";

export const createArticle = async (
  content: string,
  authorId: number,
  published: boolean,
  categories: string[],
) => {
  try {
    // const categoryInDB = await prisma?.category.findMany();

    const categoryIds = await getCategoriesIdsByNames(categories);

    console.log("categryIds", categoryIds);

    // const existingCategory = categoryInDB
    //   ?.filter((elem) => arraysAreEqual(elem.category, categories))
    //   .find((elem) => elem);

    // if (existingCategory?.id) {
    //   await prisma.article.create({
    //     data: {
    //       content,
    //       authorId: Number(authorId),
    //       published,
    //       categories: {
    //         connectOrCreate: {
    //           where: { id: existingCategory?.id },
    //           create: { category: categories?.map((category) => category) },
    //         },
    //       },
    //     },
    //     include: {
    //       categories: true,
    //     },
    //   });
    // } else {
    await prisma.article.create({
      data: {
        content,
        authorId: Number(authorId),
        published,

        categories: {
          connect: categoryIds?.map((categoryId: string) => ({
            id: categoryId,
          })),
        },
      },
      include: {
        categories: true,
      },
    });
    // }

    // if the category exists based on the categories passed from req.body, simply update the category with the next article
  } catch (error) {
    console.log("Error", error);
    // throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
};
