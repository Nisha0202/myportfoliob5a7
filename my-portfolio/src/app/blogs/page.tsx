import Link from "next/link";
import BlogCard from "@/components/BlogCard";

export const revalidate = 30; // ISR enabled

export default async function AllBlogsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
    next: { revalidate: 30 },
  });
  const blogs = await res.json();

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">All Blogs</h1>
        <Link
          href="/blogs/new"
          className="text-white text-sm px-4 py-2 rounded-sm bg-[#17a24a] hover:bg-[#22bd5b]"
        >
          + New Blog
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((b: any) => <BlogCard key={b.id} {...b} />)
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </main>
  );
}
