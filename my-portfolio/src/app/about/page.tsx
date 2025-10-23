import React from "react";
import Image from "next/image"; // This import is unused since the image was commented out

const skills = [
  // Frontend
  "React", "Next.js", "TypeScript", "Redux", "Tailwind CSS",
  // Backend
  "Node.js", "Express.js", "REST APIs", "GraphQL",
  // Databases
  "PostgreSQL", "MongoDB", "MySQL", "Redis",
  // DevOps & Tools
  "Git", "Docker", "AWS", "CI/CD",
];

// Re-styled for the new dark, unique UI
const SkillPill: React.FC<{ skill: string }> = ({ skill }) => (
  <span className="inline-block px-3 py-1.5 text-xs font-medium
                   bg-zinc-300  rounded-full">
    {skill}
  </span>
);

const AboutMe: React.FC = () => {
  return (
    // Section container: Full-screen, dark, and centers content
    <section
      id="about"
      className="bg-transparent px-4
                 h-full flex py-12 sm:pt-20 justify-center" // Fits screen
    >
      
      {/* Max-width wrapper for the content */}
      <div className="max-w-5xl w-full">
        
        {/* Unique Gradient Border Card Wrapper */}
        <div className="rounded-lg bg-linear-to-r 
                        from-zinc-400 via-green-600 to-lime-700 
                        p-1 shadow-xl transition-all duration-300
                       ">
          
          {/* Inner Card Content Area (darker glass) */}
          <div className="rounded-md bg-zinc-200
                          p-6 sm:p-8 lg:p-10">
            
            {/* Content Column */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold  mb-4 text-gray-800">
                About Me
              </h2>

              <p className=" text-sm leading-relaxed mb-8 text-gray-700">
                I'm Alex Chen, a results-oriented Software Developer from San
                Francisco with 5 years of full-stack experience. I specialize in
                the MERN stack, TypeScript, and Python, and I'm passionate about
                building scalable, user-centric applications.
              </p>

              <h3 className="text-xl font-bold text-gray-800  mb-3">
                My Journey
              </h3>
              <p className=" text-sm leading-relaxed mb-8 text-gray-700">
                At TechSolutions Inc., I helped maintain an e-commerce platform
                for over 1 million users and led a migration to GraphQL, slashing
                data-fetching times by 40%. At DataLogix Corp., I built
                client-facing analytics dashboards with React and D3.js and
                resolved over 100 bug tickets.
              </p>

              <h3 className="text-xl font-bold  mb-4">
                My Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2 mb-8 text-gray-700 ">
                {skills.map((skill) => (
                  <SkillPill key={skill} skill={skill} />
                ))}
              </div>

              <h3 className="text-xl font-bold  mb-3">
                Projects & Education
              </h3>
              <p className=" text-sm leading-relaxed text-gray-700">
                I hold a B.S. in Computer Science from UT Austin. In my spare
                time, I build projects like{" "}
                <a
                  href="https://github.com/alexchen/zentask"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" font-medium hover:underline"
                >
                  ZenTask
                </a>{" "}
                (a Next.js task manager) and{" "}
                <a
                  href="https://github.com/alexchen/algoviz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" font-medium hover:underline"
                >
                  AlgoVisualizer
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;