import { createUser } from "@/app/utils/api/user/create-user";
import { NextResponse } from "next/server";

export const GET = async (req: any, res: any) => {
  return NextResponse.json({
    message: "Congrats check your email",
  });
};

export const POST = async (req: Request, res: NextResponse) => {
  const { email, name, userId } = await req.json();

  await createUser(email, userId, name);
  return NextResponse.json({
    message: "Congrats check your email",
  });
};
