"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

import axios from "axios";
import { useAutosave } from "react-autosave";

const EditArticle = () => {
  // move to Editor.tsx
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );

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

  useAutosave({ data: value, onSave: doApiStuffOnSave });

  return (
    <div className="p-10">
      {isSaving && <p>Saving ...</p>}
      <ReactQuill
        className="h-[500px] dark:bg-black dark:text-white"
        theme="snow"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default EditArticle;
