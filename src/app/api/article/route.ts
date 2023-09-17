import { createArticle } from "@/app/utils/api/article/create-article";
import { getArticles } from "@/app/utils/api/article/get-articles";
import { updateArticle } from "@/app/utils/api/article/update-article";
import { asyncWrapper } from "@/app/utils/api/async-wrapper";

import { NextResponse } from "next/server";

export const GET = async () => {
  const [articles, error] = await asyncWrapper(getArticles);

  return NextResponse.json({
    articles,
  });
};

// creating a new article
export const POST = async (req: Request) => {
  const { content, authorId, published, categories } = await req.json();

  try {
    const article = await createArticle(
      content,
      authorId,
      published,
      categories,
    );

    console.log("article", article);

    if (article !== undefined) {
      return NextResponse.json({
        article,
      });
    }
  } catch (error) {
    console.log("Error", error);
  }

  // else if (articleError) {
  //   return NextResponse.json({
  //     articleError,
  //   });
  // }
};

export const PATCH = async (req: Request) => {
  const { content } = await req.json();
  const id = new URL(req.url);

  const articleId = id.searchParams.get("articleId");

  const [article, articleError] = await asyncWrapper(
    updateArticle,
    articleId,
    content,
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
