
export const revalidate = 60; // Revalidate each post every 1 minute

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
  const blogs = await res.json();

  return blogs.map((b: any) => ({
    slug: b.slug
  }));
}

export default async function BlogDetailsPage({ params }: { params: { slug: string } }) {



  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${params.slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return <p className="text-center mt-20">Blog not found</p>;
  }

  const blog = await res.json();
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
   
     
    </main>
  );
}
