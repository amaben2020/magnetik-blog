// no need for try/catch due to asyncHandler hoc

import prisma from "prisma/db";

export const createArticle = async (
  content: string,
  authorId: number,
  published: boolean,
  categories: string[],
) => {
  try {
    const categoryInDB = await prisma?.category.findMany();
    const existingCategory = categoryInDB?.find((post) => {
      //@ts-ignore
      return categories.every((category) => post.category?.includes(category));
    });

    if (existingCategory) {
      await prisma.article.create({
        data: {
          content,
          authorId: Number(authorId),
          published,
          categories: {
            connectOrCreate: {
              where: { id: existingCategory?.id },
              create: { category: categories },
            },
          },
        },
        include: {
          categories: true,
        },
      });
    }

    await prisma.article.create({
      data: {
        content,
        authorId: Number(authorId),
        published,
        categories: {
          connect: {
            create: { category: categories?.map((category) => category) },
          },
        },
      },
      include: {
        categories: true,
      },
    });

    // if the category exists based on the categories passed from req.body, simply update the category with the next article
  } catch (error) {
    console.log("Error", error);
  } finally {
    await prisma.$disconnect();
  }
};
