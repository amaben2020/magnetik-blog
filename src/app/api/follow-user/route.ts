import { followUser } from "@/app/utils/api/user/follow-user";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: any) => {
  try {
    const { userId, followUserId } = await req.json();

    const follows = await followUser(userId, followUserId);

    return NextResponse.json({
      follows,
    });
  } catch (error) {
    console.log(error);
    NextResponse.json({
      error: "Something went wrong",
    });
  }
};
