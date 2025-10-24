"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

interface BlogFormProps {
  initialData?: {
    title: string;
    content: string;
    tags: string[];
    coverImage?: string;
  };
  slug?: string;
  isEdit?: boolean;
}

export default function BlogForm({ initialData, slug, isEdit }: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [tags, setTags] = useState(initialData?.tags.join(", ") || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- Validation ---
    const wordCount = title.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount > 7) {
      toast.error("Title cannot be more than 7 words.");
      return; // Stop submission
    }

    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean); // filter(Boolean) removes empty strings
    if (tagArray.length > 3) {
      toast.error("You can add a maximum of 3 tags.");
      return; // Stop submission
    }
    // --- End Validation ---

    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/blogs/${slug}`, {
          title,
          content,
          tags: tagArray,
          coverImage,
        });
        toast.success("Blog updated successfully!");
      } else {
        await api.post("/blogs/new-blog", {
          title,
          content,
          tags: tagArray,
          coverImage,
        });
        toast.success("Blog created successfully!");
      }
      router.push("/blogs");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Disable button if title or content is empty
  const isDisabled = !title.trim() || !content.trim() || loading;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-transparent mt-8 mb-12 sm:mt-24 py-8 px-10 sm:border-2 border-gray-400 rounded-md space-y-5 max-w-2xl mx-auto"
    >
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="text-xl font-semibold  text-gray-800">
          {isEdit ? "Edit Blog" : "Create New Blog"}
        </div>
        <div>
          <button
            type="submit"
            disabled={isDisabled}
            className={`py-2 px-4 text-sm rounded-sm text-gray-50 ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#17a24a] hover:bg-[#22bd5b]"
            }`}
          >
            {loading ? "Saving..." : isEdit ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Title (Max 7 words)"
        className="w-full border text-sm p-2 rounded-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cover Image URL"
        className="w-full text-sm border p-2 rounded-sm"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (Max 3, comma separated)"
        className="w-full text-sm border p-2 rounded-sm"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <ReactQuill
        className=" mt-4 w-full max-w-full overflow-x-auto"
        value={content}
        onChange={setContent}
        theme="snow"
      />
    </form>
  );
}