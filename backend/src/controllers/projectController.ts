import { Request, Response } from "express";
import prisma from "../prisma";


// ✅ CREATE a new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, techStack, features, thumbnail, liveUrl, repoUrl } = req.body;

    if (!title || !description || !techStack || !features) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        techStack,
        features,
        thumbnail,
        liveUrl,
        repoUrl,
      },
    });

    res.status(201).json(project);
  } catch (error: any) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Failed to create project" });
  }
};

// ✅ GET all projects
export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(projects);
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

// ✅ GET a single project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error: any) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

// ✅ UPDATE a project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, techStack, features, thumbnail, liveUrl, repoUrl } = req.body;

    const existingProject = await prisma.project.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    const updated = await prisma.project.update({
      where: { id: Number(id) },
      data: { title, description, techStack, features, thumbnail, liveUrl, repoUrl },
    });

    res.json(updated);
  } catch (error: any) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Failed to update project" });
  }
};

// ✅ DELETE a project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingProject = await prisma.project.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    await prisma.project.delete({ where: { id: Number(id) } });

    res.json({ message: "Project deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
};
