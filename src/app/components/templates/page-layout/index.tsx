import React from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <section className="p-6">{children}</section>;
};

export default PageLayout;
