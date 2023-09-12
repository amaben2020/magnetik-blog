const ArticlePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-white dark:bg-gray-600 p-3 sm:p-10 h-[100vh]">
      {children}
    </section>
  );
};

export default ArticlePageLayout;
