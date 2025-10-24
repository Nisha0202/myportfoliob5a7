import ProjectForm from "../../../components/ProjectForm";



export default function NewProjectPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ProjectForm isEdit={false} />
    </div>
  );
}
