import Button from "@/app/components/elements/button";
import Link from "next/link";
import * as sanitizeHtml from "sanitize-html";
import ArticlePageLayout from "../../components/templates/article-page-layout";
const fetchArticles = async () => {
  const data = await fetch("http://localhost:3000/api/articles");

  return await data.json();
};
const Articles = async () => {
  const { articles } = await fetchArticles();

  return (
    <ArticlePageLayout>
      <div>
        <h2>
          {" "}
          Articles page would loop through all articles in Prisma and vercel
          serverless{" "}
        </h2>

        <Button className="border">Button</Button>
        {articles.length > 0 &&
          articles.map((article: any) => (
            <Link
              href={`/article/${article.id}`}
              className="my-3"
              key={article.id}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(article.content),
                }}
              />

              {article.published && (
                <div className="bg-green-500 rounded-2xl w-9"></div>
              )}

              {article.author?.name}
            </Link>
          ))}
      </div>
    </ArticlePageLayout>
  );
};

export default Articles;
