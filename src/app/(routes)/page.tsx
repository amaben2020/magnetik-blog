"use client";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Card from "../components/elements/cards/card";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState<any>([]);
  const [clap, setClap] = useState(0);
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

  const authorId =
    !!users?.length &&
    //@ts-ignore
    users?.find((user) => user?.clerkId === userId)?.id;

  const handleCreateArticle = async () => {
    await axios.post("/api/article", {
      content: article,
      authorId: authorId,
      published: true,
    });
  };

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

  const fetchArticles = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/article");
      console.log("articles", data);
      setArticles(data.articles);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const clapArticle = useCallback(
    async (id: string) => {
      try {
        const { data } = await axios.patch(
          `/api/article/clap?articleId=${id}&clap=${clap}`,
        );
        console.log("PUT CLAP", data);
        // console.log("articles", data);
        // setArticles(data.articles);
      } catch (error) {
        console.log(error);
      }
    },
    [clap],
  );

  // later use swr or react query to have caching feature
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

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
      <div>
        <h3>Create Article</h3>
        <textarea
          name=""
          id=""
          className="p-6 text-black"
          value={article}
          onChange={(e) => setArticle(e.target.value)}
        />
        <button onClick={handleCreateArticle}>Publish</button>

        <div>
          <h4>Articles in DB</h4>

          {articles?.map((article: any) => (
            <div
              key={article.content}
              className="border p-4 w-1/3 flex justify-between"
            >
              <p>
                {article.content} clap: {article.clap}
              </p>

              <button
                className="bg-green-500 p-2"
                onClick={async () => {
                  setClap((p) => (p >= 10 ? 10 : p + 1));
                  await clapArticle(article?.id);
                }}
              >
                {" "}
                {clap}
                Clap 👏🏾{" "}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Card
        title="Hey Jude"
        subtitle="How do you create compelling presentations that wow your colleagues and impress your managers?"
        image="https://via.placeholder.com/350x150"
        author={{}}
      />
    </div>
  );
}
