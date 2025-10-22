"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import toast, { Toaster, Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface BlogCardProps {
  title: string;
  slug: string;
  tags: string[];
  coverImage?: string | null;
}

export default function BlogCard({ title, slug, tags, coverImage }: BlogCardProps) {
  const [isOwner, setIsOwner] = useState(false);
  const router = useRouter();
  const [toastId, setToastId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsOwner(!!token);
  }, []);

  const handleDelete = () => {
    if (toastId) return; // Prevent opening another toast while one is active

    const id = toast(
      (t) => (
        <div className="flex flex-col items-center">
          <p className="mb-2">Are you sure you want to delete?</p>
          <div className="flex space-x-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                setToastId(null);
                try {
                  const token = localStorage.getItem("token");
                  await api.delete(`/blogs/${slug}`);
                  toast.success("Blog deleted successfully!")
                  router.push("/blogs");
                } catch (err: any) {
                  toast.error(err.response?.data?.message || "Failed to delete blog");
                }
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
            >
              <FiTrash2 /> Yes
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setToastId(null);
              }}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 flex items-center gap-1"
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );

    setToastId(id);
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition relative">
      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
      )}
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-sm bg-gray-100 rounded-md text-gray-700"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Link
          href={`/blogs/${slug}`}
          className="text-[#22bd5b] hover:underline text-base"
        >
          Read More →
        </Link>

        {isOwner && (
          <div className="flex gap-2">
            <Link
              href={`/blogs/edit/${slug}`}
              className="bg-transparent text-blue-500 px-3 py-1  hover:text-blue-600 text-sm flex items-center gap-1"
            >
              <FiEdit /> Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-transparent text-red-600 px-3 py-1  hover:text-red-700 text-sm flex items-center gap-1"
            >
              <FiTrash2 /> 
            </button>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
