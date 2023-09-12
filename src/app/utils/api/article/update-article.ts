import prisma from "prisma/db";

export const updateArticle = async (id: string, content: string) => {
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
