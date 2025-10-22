// src/components/Navbar.tsx
'use client'; // This component might use client-side hooks like useRouter for navigation

import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Navbar() {
  const router = useRouter();

  const handleLoginClick = () => {
    // Navigate to the login page
    router.push("/login");
  };

  return (
    <nav className="max-w-7xl mx-auto p-4 flex items-center justify-between">
      <div className="flex items-center justify-between w-full">
        {/* Logo/Brand */}
        <Link href="/" className="logo font-bold text-[#3a443e]">
          Nisha.Portfolio
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="#about" className=" text-[#17a24a] hover:text-[#22bd5b] transition-colors">
            About Me
          </Link>
          <Link href="#projects" className="text-[#17a24a] hover:text-[#22bd5b]">
            Projects
          </Link>
              <Link href="#blogs" className="text-[#17a24a] hover:text-[#22bd5b]">
            Blogs
          </Link>
           
              <Link href="#blogs" className="text-[#17a24a] hover:text-[#22bd5b]">
            Create Blogs
          </Link>
            <Link href="#blogs" className="text-[#17a24a] hover:text-[#22bd5b]">
            Create Blogs
          </Link>
        
        </div>

    
        <button
          onClick={handleLoginClick}
          className="bg-transparent px-4 py-2 text-[#17a24a] hover:text-[#22bd5b] font-bold cursor-pointer focus:outline-none "
        >
          Login
        </button>
      </div>
    </nav>
  );
}