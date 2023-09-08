import { createClap } from "@/app/utils/api/article/create-clap";
import { asyncWrapper } from "@/app/utils/api/async-wrapper";
import { NextResponse } from "next/server";

// creating a new article ?articleId=jnsaj&clap=12
export const PATCH = async (req: Request) => {
  const url = new URL(req.url);

  // whatever comes from query is a string, always double-check
  const articleId = url.searchParams.get("articleId");
  const clap = url.searchParams.get("clap");

  const [article, articleError] = await asyncWrapper(
    createClap,
    articleId,
    Number(clap),
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
