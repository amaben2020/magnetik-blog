"use client";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditArticle = () => {
  const [value, setValue] = useState("");

  return (
    <div>
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
