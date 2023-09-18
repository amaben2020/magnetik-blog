import { getArticles } from "@/app/utils/api/article/get-articles";
import { asyncWrapper } from "@/app/utils/api/async-wrapper";
import { NextResponse } from "next/server";

export const GET = async () => {
  const [articles, errorArticles] = await asyncWrapper(getArticles);

  if (articles) {
    return NextResponse.json({
      articles,
    });
  } else {
    return NextResponse.json({
      errorArticles,
    });
  }
};
