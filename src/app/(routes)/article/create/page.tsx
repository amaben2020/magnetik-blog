"use client";

import Editor from "@/app/components/elements/editor";
import axios from "axios";
import chroma from "chroma-js";
import { useCallback, useState } from "react";
import Select, { StylesConfig } from "react-select";

const CreateArticlePage = () => {
  const [value, setValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const options = [
    { value: "chocolate", label: "Chocolate", color: "brown" },
    { value: "strawberry", label: "Strawberry", color: "red" },
    { value: "vanilla", label: "Vanilla", color: "yellow" },
  ];

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

  return (
    <div className="p-10">
      <div>
        1. CreateArticlePage Add Categories: [React Select and API calls][
        Technology Software Research Frameworks Product Design Management
        Leadership SAAS AI ML] Redirect 2. User to articles page with newest
        first sorted
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
      </div>
    </div>
  );
};

export default CreateArticlePage;
