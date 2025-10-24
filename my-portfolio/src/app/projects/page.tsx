import ProjectCard from "@/components/ProjectCard";
import NewProjectButton from "@/components/NewProjectButton";

export const revalidate = 30;

export default async function ProjectsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    next: { revalidate: 30 },
  });
  const projects = await res.json();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-xl font-bold">My Projects</h1>
        <NewProjectButton />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
