import { NextResponse } from "next/server";

export const GET = async (req: any, res: any) => {
  return NextResponse.json({
    message: "Congrats check your email",
  });
};

export const POST = async (req: Request, res: NextResponse) => {
  const request = await req.json();
  console.log("Request", request.body);
  console.log("RESPONSE", res);
  return NextResponse.json({
    message: "Congrats check your email",
  });
};
