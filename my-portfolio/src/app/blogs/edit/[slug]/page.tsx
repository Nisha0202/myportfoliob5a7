"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import BlogForm from "@/components/BlogForm";

export default function EditBlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    async function fetchBlog() {
      const res = await api.get(`/blogs/${slug}`);
      setBlog(res.data);
    }
    if (slug) fetchBlog();
  }, [slug]);

  if (!blog) return <p className="text-center mt-20">Loading...</p>;

  return <BlogForm  initialData={blog} slug={slug as string} isEdit />;
}
