import prisma from "prisma/db";

export const getCategoriesIdsByNames = async (
  categories: string[],
): Promise<{ id: string }[]> => {
  const allCategory = await prisma.category.findMany();

  const result = [] as any;

  categories.forEach((name) => {
    const items = allCategory.filter((elem) =>
      elem.category.every((elem) => elem.includes(name)),
    );
    result.push(items);
  });

  return result.flat().map((elem: { id: string }) => elem.id);
};
