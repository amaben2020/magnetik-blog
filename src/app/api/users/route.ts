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
