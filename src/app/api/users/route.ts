import { asyncWrapper } from "@/app/utils/api/async-wrapper";
import { createUser } from "@/app/utils/api/user/create-user";
import { getUsers } from "@/app/utils/api/user/get-users";
import { NextResponse } from "next/server";

export const GET = async () => {
  const users = await getUsers();

  console.log(users);

  try {
    return NextResponse.json({
      users,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  const { email, name, userId } = await req.json();

  const [users, userError] = await asyncWrapper(
    createUser,
    email,
    userId,
    name,
  );

  // await createUser(email, userId, name);
  console.log("users", users);
  console.log("users error ❌", userError);
  return NextResponse.json({
    users,
  });
};
