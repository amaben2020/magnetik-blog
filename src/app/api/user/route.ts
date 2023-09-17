import { asyncWrapper } from "@/app/utils/api/async-wrapper";
import { getUser } from "@/app/utils/api/user/get-user";
import { NextResponse } from "next/server";

export const GET = async (req: NextResponse) => {
  const reqUrl = new URL(req.url);
  const clerkID = reqUrl.searchParams.get("clerkID");
  const [user, errorUsers] = await asyncWrapper(getUser, clerkID);
  console.log("USER", user);
  try {
    return NextResponse.json({
      user,
    });
  } catch (error) {
    console.log("Error", error);
    console.log(errorUsers);
  }
};
