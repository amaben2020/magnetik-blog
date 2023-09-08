import { createArticle } from "@/app/utils/api/article/create-article";
import { asyncWrapper } from "@/app/utils/api/async-wrapper";
import { getUsers } from "@/app/utils/api/user/get-users";
import { NextResponse } from "next/server";

export const GET = async () => {
  const users = await getUsers();

  try {
    return NextResponse.json({
      users,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

// creating a new user
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
