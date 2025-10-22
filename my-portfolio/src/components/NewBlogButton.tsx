"use client"; // This is the most important line!

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NewBlogButton() {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // This code now runs safely in the browser, not on the server
    const token = localStorage.getItem("token");
    setIsOwner(!!token);
  }, []);

  // If the user is not an owner, render nothing
  if (!isOwner) {
    return null;
  }

  // If they are an owner, render the button
  return (
    <Link
      href="/blogs/new"
      className="text-white text-sm px-4 py-2 rounded-sm bg-[#17a24a] hover:bg-[#22bd5b]"
    >
      + New Blog
    </Link>
  );
}