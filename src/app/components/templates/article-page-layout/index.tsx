const ArticlePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-white dark:bg-gray-600 p-3 sm:p-10 h-[100vh] flex justify-between">
      {children}
      <div>
        <h2>Related Articles</h2>
        RELATED ARTICLES HERE
      </div>
    </section>
  );
};

export default ArticlePageLayout;
