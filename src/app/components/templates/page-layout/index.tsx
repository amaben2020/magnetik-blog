import React from "react";

type TPageLayout = { children: React.ReactNode };
const PageLayout = ({ children }: TPageLayout) => {
  return <div>{children}</div>;
};

export default PageLayout;
