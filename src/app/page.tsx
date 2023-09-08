"use client";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const data = useUser();
  const router = useRouter();

  // In case the user signs out while on the page
  useEffect(() => {
    if (!userId) router.push("/sign-in");
  }, [router, userId]);

  const getUsers = () => {
    try {
    } catch (error) {}
  };

  const handleUserCreate = async () => {
    await axios.post("/api/welcome", {
      email: data.user?.primaryEmailAddress?.emailAddress,
      userId,
      name: data.user?.fullName,
    });
  };

  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      Hello, {userId} your current active session is {sessionId}
      <button className="bg-green-500 p-4" onClick={handleUserCreate}>
        Create User
      </button>
    </div>
  );
}
