"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import toast from "react-hot-toast";
import Link from "next/link";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await api.get(`/blogs/${slug}`);
        setBlog(res.data);
      } catch {
        toast.error("Blog not found");
      }
    }
    if (slug) fetchBlog();
  }, [slug]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await api.delete(`/blogs/${slug}`);
      toast.success("Blog deleted successfully");
      window.location.href = "/blogs";
    }
  };

  if (!blog) return <p className="text-center mt-20">Loading...</p>;

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <div className="flex gap-3 mt-6">
        <Link
          href={`/blogs/edit/${blog.slug}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </main>
  );
}
