import { createArticle } from "@/app/utils/api/article/create-article";
import { getArticles } from "@/app/utils/api/article/get-articles";
import { asyncWrapper } from "@/app/utils/api/async-wrapper";

import { NextResponse } from "next/server";

export const GET = async () => {
  const [articles, error] = await asyncWrapper(getArticles);
  console.log("articles", articles);

  return NextResponse.json({
    articles,
  });
};

// creating a new article
export const POST = async (req: Request, res: NextResponse) => {
  const { content, authorId, published } = await req.json();

  const [article, articleError] = await asyncWrapper(
    createArticle,
    content,
    authorId,
    published,
  );

  if (article) {
    return NextResponse.json({
      article,
    });
  } else if (articleError) {
    return NextResponse.json({
      articleError,
    });
  }
};