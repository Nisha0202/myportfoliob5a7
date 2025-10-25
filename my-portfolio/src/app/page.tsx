import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#d9d9de] to-zinc-300 text-gray-800">
      {/* HERO SECTION */}
      <section className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto px-6 pt-20 pb-8 sm:pb-16 gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Hi, I’m <span className="text-[#17a24a]">Alex</span>
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            A passionate Frontend Developer skilled in building fast, accessible, and user-friendly
            web apps using <strong>Next.js</strong>, <strong>React</strong>, and{" "}
            <strong>Tailwind CSS</strong>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <Link
              href="/projects"
              className="bg-[#17a24a] text-white px-5 py-2 rounded-md hover:bg-[#13873d] transition"
            >
              View Projects
            </Link>
            <Link
              href="#contact"
              className="border border-[#17a24a] text-[#17a24a] px-5 py-2 rounded-md hover:bg-[#e9f7ef] transition"
            >
              Contact Me
            </Link>
          </div>
                  <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Node.js",
            "Express.js",
            "MongoDB",
          ].map((skill) => (
            <span
              key={skill}
              className="text-sm px-4 py-2 rounded-full bg-gray-300 border text-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src="https://i.pinimg.com/736x/26/05/dc/2605dc78c02e034a60bbdbbb8c5235c5.jpg"
            alt="Developer illustration"
            width={400}
            height={300}
            className="rounded-xl shadow-md object-contain"
            priority
          />
        </div>
      </section>

      {/* ABOUT SECTION */}
       <section
      id="about"
      className="max-w-6xl mx-auto px-6 mb-12 py-4 sm:py-12 md:py-20 flex flex-col items-center text-center"
    >
      <h2 className="text-2xl font-bold mb-6 text-[#17a24a] tracking-tight">
        About Me
      </h2>

      <p className="text-gray-700 max-w-2xl mb-8 leading-relaxed text-sm">
        I’m a <span className="font-medium text-[#17a24a text-sm]">Computer Science student</span> and a
        <span className="font-medium text-[#17a24a]"> Frontend Developer</span> who enjoys creating
        modern, user-friendly web applications with a focus on clean UI and accessibility. I’m
        always curious about learning new technologies and improving my problem-solving skills.
      </p>

      <Link
        href="/about"
        className="bg-[#17a24a] text-white px-6 py-2.5 rounded-md font-medium hover:bg-[#13873d] hover:shadow-md transition-all duration-200"
      >
        Know More →
      </Link>
    </section>


      {/* CONTACT SECTION */}
      <section id="contact" className="bg-[#17a24a] text-white py-16 text-center px-6 rounded-t-4xl">
        <h2 className="text-xl font-bold mb-4">Let’s Work Together</h2>
        <p className="max-w-2xl mx-auto mb-6 text-white/90">
          Have a project in mind or want to collaborate? I’d love to hear from you.
        </p>
        <a
          href="mailto:nishajabatunnessa@gmail.com"
          className="bg-white text-[#17a24a] px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition"
        >
          Say Hello
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-gray-800">
        © {new Date().getFullYear()} Alex — Built with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
