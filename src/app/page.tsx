"use client";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";

export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const data = useUser();

  console.log("Data", data);

  console.log("userId", userId);

  // In case the user signs out while on the page
  if (!isLoaded || !userId) {
    return null;
  }

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
