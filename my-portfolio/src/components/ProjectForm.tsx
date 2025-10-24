"use client";

import { useState, useEffect } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ProjectFormProps {
  initialData?: {
    title: string;
    description: string;
    techStack: string[];
    features: string[];
    thumbnail?: string;
    liveUrl?: string;
    repoUrl?: string;
  };
  id?: number;
  isEdit?: boolean;
}

export default function ProjectForm({ initialData, id, isEdit }: ProjectFormProps) {
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

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        description: initialData.description,
        techStack: initialData.techStack.join(", "),
        features: initialData.features.join(", "),
        thumbnail: initialData.thumbnail || "",
        liveUrl: initialData.liveUrl || "",
        repoUrl: initialData.repoUrl || "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        techStack: "",
        features: "",
        thumbnail: "",
        liveUrl: "",
        repoUrl: "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, description, techStack, features, thumbnail, liveUrl, repoUrl } = form;
    const descriptionWordCount = description.trim().split(/\s+/).length;
    const featureList = features.split(",").map(f => f.trim()).filter(Boolean);
    const techStackList = techStack.split(",").map(t => t.trim()).filter(Boolean);

    if (!title || !description || !techStack || !features) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (descriptionWordCount > 18) {
      toast.error("Description must not exceed 18 words.");
      return;
    }

    if (featureList.length > 3) {
      toast.error("You can add up to 3 features only.");
      return;
    }

    if (featureList.some(f => f.split(/\s+/).length > 7)) {
      toast.error("Each feature must be at most 7 words.");
      return;
    }

    try {
      if (isEdit && id) {
        await api.put(`/projects/${id}`, {
          title,
          description,
          techStack: techStackList,
          features: featureList,
          thumbnail,
          liveUrl,
          repoUrl,
        });
        toast.success("Project updated successfully!");
      } else {
        await api.post("/projects", {
          title,
          description,
          techStack: techStackList,
          features: featureList,
          thumbnail,
          liveUrl,
          repoUrl,
        });
        toast.success("Project created successfully!");
      }
      router.push("/projects");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save project");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-transparent mt-6 mb-12 sm:mt-15 py-8 px-10 sm:border-2 border-gray-400 rounded-md w-full max-w-lg"
    >
      <h2 className="text-xl font-bold mb-6">
        {isEdit ? "Edit Project" : "Create New Project"}
      </h2>

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
        placeholder="Description (max 18 words)"
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
        placeholder="Features (max 3, comma separated, 7 words each)"
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
        {isEdit ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
}
