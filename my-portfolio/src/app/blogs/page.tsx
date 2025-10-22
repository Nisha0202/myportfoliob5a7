"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    }
    fetchBlogs();
  }, []);

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">All Blogs</h1>
        <Link
          href="/blogs/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + New Blog
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((b) => (
          <BlogCard key={b.id} {...b} />
        ))}
      </div>
    </main>
  );
}
