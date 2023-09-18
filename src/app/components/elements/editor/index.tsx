import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useMemo } from "react";
import { useAutosave } from "react-autosave";
import "react-quill/dist/quill.snow.css";

//TODO: pass down content from create or update page if necessary or do it here

const Editor = ({
  content,
  setContent,
  isSaving,
  updateArticlePromise,
}: {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  isSaving: boolean;
  updateArticlePromise: (data: string) => Promise<void>;
}) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );

  useAutosave({ data: content, onSave: updateArticlePromise });

  return (
    <div>
      Editor
      {isSaving && <p>Saving ...</p>}
      <ReactQuill
        className="h-[500px] dark:bg-black dark:text-white"
        theme="snow"
        value={content}
        onChange={setContent}
      />
    </div>
  );
};

export default Editor;
