"use client";

import Link from "next/link";

interface BlogCardProps {
  title: string;
  slug: string;
  tags: string[];
  coverImage?: string | null;
}

export default function BlogCard({ title, slug, tags, coverImage }: BlogCardProps) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition">
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
      <Link
        href={`/blogs/${slug}`}
        className="text-blue-600 hover:underline text-sm"
      >
        Read More →
      </Link>
    </div>
  );
}
