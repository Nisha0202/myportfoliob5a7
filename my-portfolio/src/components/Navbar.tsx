'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginClick = () => router.push("/login");

  const handleLogoutClick = () => {
   
    toast(
      (t) => (
        <div className="flex flex-col items-center">
          <p className="mb-2">Are you sure you want to log out?</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                toast.dismiss(t.id);
                router.push("/login");
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 flex items-center gap-1"
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  return (
    <nav className="max-w-7xl mx-auto p-4 flex items-center justify-between relative">
      <Toaster />
      {/* Logo */}
      <Link href="/" className="logo font-bold text-[#3a443e]">
        Alex.Portfolio
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-4 items-center pl-6">
        <Link href="/about" className="text-[#17a24a] hover:text-[#22bd5b] transition-colors">
          About Me
        </Link>

         <Link href={isLoggedIn ? "/projects" : "/projects"} className="text-[#17a24a] hover:text-[#22bd5b]">
          {isLoggedIn ? "Manage Projects" : "Projects"}
        </Link>
   


        <Link href={isLoggedIn ? "/blogs" : "/blogs"} className="text-[#17a24a] hover:text-[#22bd5b]">
          {isLoggedIn ? "Manage Blogs" : "Blogs"}
        </Link>
   


        {isLoggedIn ? (
          <button
            onClick={handleLogoutClick}
            className="bg-transparent px-4 py-2 text-red-600 hover:text-red-700 font-bold cursor-pointer focus:outline-none"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLoginClick}
            className="bg-transparent px-4 py-2 text-[#17a24a] hover:text-[#22bd5b] font-bold cursor-pointer focus:outline-none"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full px-4 py-12 left-0 w-full bg-gray-200 shadow-sm flex flex-col items-end space-y-2 md:hidden z-50">
          <Link href="#about" onClick={() => setMenuOpen(false)} className="text-[#17a24a] hover:text-[#22bd5b]">
            About Me
          </Link>
          <Link href="#projects" onClick={() => setMenuOpen(false)} className="text-[#17a24a] hover:text-[#22bd5b]">
            Projects
          </Link>
          <Link href={isLoggedIn ? "/blogs" : "/blogs"} onClick={() => setMenuOpen(false)} className="text-[#17a24a] hover:text-[#22bd5b]">
            {isLoggedIn ? "Manage Blogs" : "Blogs"}
          </Link>
    

          {isLoggedIn ? (
            <button
              onClick={() => { setMenuOpen(false); handleLogoutClick(); }}
              className="bg-red-600 text-sm text-white px-4 py-2 rounded-sm hover:bg-red-700 "
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => { setMenuOpen(false); handleLoginClick(); }}
              className="bg-[#17a24a] text-sm text-white px-4 py-2 rounded-sm hover:bg-[#22bd5b]"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
