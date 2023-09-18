import { asyncWrapper } from "@/app/utils/api/async-wrapper";
import { createUser } from "@/app/utils/api/user/create-user";
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
  const { email, name, userId } = await req.json();

  const [users, userError] = await asyncWrapper(
    createUser,
    email,
    userId,
    name,
  );

  if (users) {
    return NextResponse.json({
      users,
    });
  } else if (userError) {
    return NextResponse.json({
      userError,
    });
  }
};
