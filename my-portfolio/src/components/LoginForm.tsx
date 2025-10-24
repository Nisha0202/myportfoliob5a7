"use client";

import { useState } from "react";
import api from "@/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      toast.success(res.data.message);

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "Something went wrong. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md  py-14 px-10 border-2 border-gray-400 rounded-md">
      <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
        Admin Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-0"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[#17a24a] text-gray-50 rounded-sm hover:bg-[#22bd5b]"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
