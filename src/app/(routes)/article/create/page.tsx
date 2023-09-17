"use client";

import Button from "@/app/components/elements/button";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import chroma from "chroma-js";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import Select, { StylesConfig } from "react-select";

const CreateArticlePage = () => {
  const [value, setValue] = useState("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );

  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  const { userId } = useAuth();

  // get this from context later
  const [user, setUser] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const fetchUser = useCallback(async () => {
    const { data } = await axios.get(`/api/user?clerkID=${userId}`);
    console.log(data);
    setUser(data.user);
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  console.log("USER", user);

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

  console.log("CV", value);
  console.log("categories", categories);

  const handleCreateArticle = async () => {
    try {
       await axios.post("/api/article", {
        content: value,
        authorId: user?.id,
        published: true,
        categories,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!isMount) {
    return null;
  }

  return (
    <div className="p-10">
      {/* Create with Edemede AI 🤖 (links to Langchain stuff) */}
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
        <div>
          {/* <ReactQuill
            className="dark:bg-black dark:text-white"
            value={value}
            theme="snow"
            onChange={setValue}
          /> */}
          <textarea
            className="p-10 max-h-[500px] w-full"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
        </div>
      </div>{" "}
      <Button onClick={handleCreateArticle} className="border">
        {" "}
        Create Article
      </Button>
    </div>
  );
};

export default CreateArticlePage;
