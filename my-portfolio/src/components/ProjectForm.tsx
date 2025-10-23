"use client";

import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProjectForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    features: "",
    thumbnail: "",
    liveUrl: "",
    repoUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/projects", {
        ...form,
        techStack: form.techStack.split(",").map((s) => s.trim()),
        features: form.features.split(",").map((s) => s.trim()),
      });

      toast.success("Project created successfully!");
      router.push("/projects");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create project");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-100 p-8 rounded-xl shadow-md w-full max-w-lg">
      <h2 className="text-xl font-bold mb-6">Create New Project</h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 mb-3 border rounded"
        rows={3}
        required
      />

      <input
        name="techStack"
        value={form.techStack}
        onChange={handleChange}
        placeholder="Tech Stack (comma separated)"
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <input
        name="features"
        value={form.features}
        onChange={handleChange}
        placeholder="Features (comma separated)"
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <input
        name="thumbnail"
        value={form.thumbnail}
        onChange={handleChange}
        placeholder="Thumbnail URL"
        className="w-full p-2 mb-3 border rounded"
      />

      <input
        name="liveUrl"
        value={form.liveUrl}
        onChange={handleChange}
        placeholder="Live URL"
        className="w-full p-2 mb-3 border rounded"
      />

      <input
        name="repoUrl"
        value={form.repoUrl}
        onChange={handleChange}
        placeholder="Repository URL"
        className="w-full p-2 mb-4 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-[#17a24a] hover:bg-[#22bd5b] text-white py-2 rounded"
      >
        Create Project
      </button>
    </form>
  );
}
