"use client";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [article, setArticle] = useState("");
  const data = useUser();
  const router = useRouter();

  const getUsers = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/users");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      router.push("/sign-in");
    }
    getUsers();
  }, [router, userId, getUsers]);

  const handleUserCreate = async () => {
    await axios.post("/api/users", {
      email: data.user?.primaryEmailAddress?.emailAddress,
      userId,
      name: data.user?.fullName,
    });
  };

  const handleCreateArticle = async () => {
    await axios.post("/api/article", {
      content: article,
      authorId:
        !!users.length && users?.find((user) => user?.clerkId === userId).id,
      published: true,
    });
  };
  console.log(
    "users.find((user) => user?.clerkId === userId).id",
    users.find((user) => user?.clerkId === userId)?.id,
  );

  const handleFollowUser = async (userId: any, followUserId: string) => {
    try {
      await axios.post("/api/follow-user", {
        userId,
        followUserId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      Hello, {userId} your current active session is {sessionId}
      <button className="bg-green-500 p-4" onClick={handleUserCreate}>
        Create User
      </button>
      <h2>Users in App 🤖</h2>
      <div className="m-3">
        {users?.map((user: any) => (
          <div
            className="p-4 my-4 border flex max-w-md justify-between items-center"
            key={user.clerkId}
          >
            <div>
              <p> id : {user.clerkId} </p>
              <p className="my-2"> name : {user.name} </p>
            </div>

            <button
              onClick={() => handleFollowUser(userId, user.clerkId)}
              className="bg-green-500 p-2 m-3"
              // disabled:bg-green-200 cursor-not-allowed text-black
              disabled={user.clerkId === userId}
            >
              Follow
            </button>
          </div>
        ))}
      </div>
      <h3>Create Article</h3>
      <textarea
        name=""
        id=""
        className="p-6 text-black"
        value={article}
        onChange={(e) => setArticle(e.target.value)}
      />
      <button onClick={handleCreateArticle}>Publish</button>
    </div>
  );
}
