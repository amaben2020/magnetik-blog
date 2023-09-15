"use client";

import { useCallback, useState } from "react";
import "react-quill/dist/quill.snow.css";

import Editor from "@/app/components/elements/editor";
import axios from "axios";

const EditArticle = () => {
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
      <Editor
        content={value}
        setContent={setValue}
        isSaving={isSaving}
        updateArticlePromise={doApiStuffOnSave}
      />
    </div>
  );
};

export default EditArticle;
