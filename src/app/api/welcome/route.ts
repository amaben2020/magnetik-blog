import { NextResponse } from "next/server";

export const GET = async (req: any, res: any) => {
  return NextResponse.json({
    message: "Congrats check your email",
  });
};

export const POST = async (req: Request, res: NextResponse) => {
  return NextResponse.json({
    message:
      "Congrats check your email cos this is a webhook that fires whenever a new user is created in our app",
  });
};
