import { asyncWrapper } from "@/app/utils/api/async-wrapper";
import { getCategoriesIdsByNames } from "@/app/utils/api/category/get-category-ids-by-names";
import { NextResponse } from "next/server";

export const GET = async (req: NextResponse) => {
  const categoryUrl = new URL(req.url);

  const queryString = categoryUrl.href.split("?")[1];

  // Parse the query string into an object
  const queryParams = new URLSearchParams(queryString);

  // Initialize an empty array to store the parameter values
  const categories = [];

  // Iterate through all the query parameters and collect their values
  for (const [_, paramValue] of queryParams) {
    categories.push(paramValue);
  }

  const [category, errorCategory] = await asyncWrapper(
    getCategoriesIdsByNames,
    categories,
  );

  if (category) {
    return NextResponse.json({
      category,
    });
  } else {
    return NextResponse.json({
      errorCategory,
    });
  }
};
