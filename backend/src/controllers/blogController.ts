import { Request, Response } from "express";
import prisma from "../prisma";
import slugify from "slugify";

// Create a new blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, tags, coverImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) {
      return res.status(400).json({ message: "A blog with this title already exists" });
    }

    const blog = await prisma.blog.create({
      data: { title, slug, content, tags, coverImage },
    });

    return res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all blogs
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single blog by slug
export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const blog = await prisma.blog.findUnique({ where: { slug } });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update blog (title, content, tags, coverImage)
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { title, content, tags, coverImage } = req.body;

    const blog = await prisma.blog.findUnique({ where: { slug } });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    let newSlug = slug;
    if (title && title !== blog.title) {
      newSlug = slugify(title, { lower: true, strict: true });
    }

    const updated = await prisma.blog.update({
      where: { slug },
      data: { title, content, tags, coverImage, slug: newSlug },
    });

    res.json({ message: "Blog updated successfully", blog: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const blog = await prisma.blog.findUnique({ where: { slug } });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await prisma.blog.delete({ where: { slug } });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
