"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NewProjectButton() {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsOwner(!!token);
  }, []);

  if (!isOwner) return null;

  return (
    <Link
      href="/projects/new"
      className="bg-[#17a24a] hover:bg-[#22bd5b] text-white px-4 py-2 rounded-md text-sm font-medium"
    >
      + New Project
    </Link>
  );
}
