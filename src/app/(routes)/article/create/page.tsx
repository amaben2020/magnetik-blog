"use client";

import Button from "@/app/components/elements/button";
import Editor from "@/app/components/elements/editor";
import axios from "axios";
import chroma from "chroma-js";
import { useCallback, useState } from "react";
import Select, { StylesConfig } from "react-select";

const CreateArticlePage = () => {
  const [value, setValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const options = [
    { value: "Technology", label: "Technology", color: "green" },
    { value: "Software Research", label: "Software Research", color: "red" },
    { value: "Frameworks", label: "Frameworks", color: "orange" },
    { value: "Product", label: "Product", color: "black" },
    { value: "Design", label: "Design", color: "purple" },
    { value: "Management", label: "Management", color: "brown" },
    { value: "Leadership", label: "Leadership", color: "violet" },
    { value: "SAAS", label: "SAAS", color: "grey" },
    { value: "AI", label: "AI", color: "pink" },
    { value: "ML", label: "ML", color: "#6941C6" },
  ];

  const MOCK_ARTICLE_ID = "clmasciul00099k1gg77czzd1";

  const doApiStuffOnSave = useCallback(async (data: string) => {
    // if (data === content) return; use this for when you pass down content
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

  const colourStyles: StylesConfig<any, true> = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  const [categories, setCategories] = useState<string[]>([]);

  const handleMultipleSelect = (selectedOptions: any) => {
    const selected = selectedOptions.map((option: any) => option?.value);

    setCategories(selected);
  };

  const handleCreateArticle = async () => {
    try {
      const data = await axios.post("/api/article", {
        content: value,
        authorId: 4,
        published: true,
        categories,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">
      <div>
        1. CreateArticlePage Add Categories: [React Select and API calls]
        Redirect 2. User to articles page with newest first sorted
        <Select
          closeMenuOnSelect={false}
          defaultValue={[options[0], options[1]]}
          isMulti
          value={options.filter((option) => categories.includes(option.value))}
          options={options}
          styles={colourStyles}
          onChange={handleMultipleSelect}
        />
        <Editor
          content={value}
          setContent={setValue}
          isSaving={isSaving}
          updateArticlePromise={doApiStuffOnSave}
        />
      </div>{" "}
      <Button onClick={handleCreateArticle} className="border">
        {" "}
        Create Article{" "}
      </Button>
    </div>
  );
};

export default CreateArticlePage;
