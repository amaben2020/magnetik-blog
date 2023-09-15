"use client";

import Editor from "@/app/components/elements/editor";
import axios from "axios";
import { useCallback, useState } from "react";

const CreateArticlePage = () => {
  const [value, setValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const MOCK_ARTICLE_ID = "clmasciul00099k1gg77czzd1";

  const doApiStuffOnSave = useCallback(async (data: string) => {
    // if (data === content) return;
    setIsSaving(true);
    try {
      await axios.patch(`/api/article?articleId=${MOCK_ARTICLE_ID}`, {
        content: data,
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      console.log("DONE");
      setIsSaving(false);
    }
  }, []);

  return (
    <div className="p-10">
      <div>
        1. CreateArticlePage Add Categories: [React Select and API calls]
        Redirect 2. User to articles page with newest first sorted
        <Editor
          content={value}
          setContent={setValue}
          isSaving={isSaving}
          updateArticlePromise={doApiStuffOnSave}
        />
      </div>
    </div>
  );
};

export default CreateArticlePage;
