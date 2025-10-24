"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  thumbnail?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const [isOwner, setIsOwner] = useState(false);
  const [toastId, setToastId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsOwner(!!token);
  }, []);

  const handleDelete = () => {
    if (toastId) return;

    const id = toast(
      (t) => (
        <div className="flex flex-col items-center">
          <p className="mb-2">Delete this project?</p>
          <div className="flex space-x-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                setToastId(null);
                try {
                  await api.delete(`/projects/${project.id}`);
                  toast.success("Project deleted!");
                  router.refresh();
                } catch (err: any) {
                  toast.error(err.response?.data?.message || "Failed to delete");
                }
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
            >
              <FiTrash2 /> Yes
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setToastId(null);
              }}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 flex items-center gap-1"
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );

    setToastId(id);
  };

  return (
    <div className="p-6 bg-zinc-200 border-2 border-gray-300 rounded-xl hover:shadow-md transition relative flex flex-col h-[510px]">
      {project.thumbnail ? (
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={600}
          height={400}
          unoptimized={true}
          className="rounded-lg object-cover mb-4 w-full h-40"
        />
      ) : (
        <div className="h-40 bg-zinc-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
      <p className="text-gray-800 text-sm mb-3">{project.description}</p>

      {/* Features Section */}
      {project.features?.length > 0 && (
        <ul className="text-gray-700 text-sm mb-5 list-disc list-inside space-y-1 h-auto">
          {project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs bg-zinc-300 text-zinc-800 px-2 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex justify-between text-sm font-medium mb-16">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" className="text-blue-600 hover:underline">
            Live ↗
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" className="text-zinc-700 hover:underline">
            Code ↗
          </a>
        )}
      </div>

      {isOwner && (
        <div className="absolute bottom-6 right-4 flex gap-4">
          <Link href={`/projects/edit/${project.id}`} className="text-blue-500 hover:text-blue-600">
            <FiEdit size={20} />
          </Link>
          <button onClick={handleDelete} className="text-red-600 hover:text-red-700">
            <FiTrash2 size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
