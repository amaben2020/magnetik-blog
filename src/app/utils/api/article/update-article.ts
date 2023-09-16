import prisma from "prisma/db";

export const updateArticle = async (
  id: string,
  content: string,
  categories: string[],
) => {
  const updatedContent = await prisma.article.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });

  return updatedContent;
};
