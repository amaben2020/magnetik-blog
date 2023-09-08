// no need for try/catch due to asyncHandler hoc

import prisma from "prisma/db";

export const createArticle = async (
  content: string,
  authorId: number,
  published: boolean,
) => {
  console.log("content", content);
  await prisma.article.create({
    data: {
      content,
      authorId,
      published,
      // commented code would be used to update an article when their individual buttons are clicked. Our function for create mostly requires the content
      // categories Category[]
      // published Boolean @default(false)
      // author User? @relation( fields: [authorId] , references: [id], onDelete:Cascade)
      // comments Comment[]
      // clap Int @default(0)
    },
  });
};
