import { useEffect, useRef, useState } from "react";
import ProjectCard from "../components/projectCard/ProjectCard";
import "./Projects.css";

type Project = {
    title: string;
    description: string;
    link: string;
    img1: string;
    img2?: string;
    alt?: string;
    github?: string;
    category: string;
};

function Projects() {
    const webRef = useRef<HTMLDivElement>(null);
    const otherRef = useRef<HTMLDivElement>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch("/projects/projects.json")
            .then((res) => res.json())
            .then((data: Project[]) => setProjects(data));
    }, []);

    function scroll(ref: React.RefObject<HTMLDivElement | null>, dir: number) {
        if (ref.current) {
            ref.current.scrollBy({
                left: dir * ref.current.offsetWidth,
                behavior: "smooth",
            });
        }
    }

    const webProjects = projects.filter((p) => p.category === "Web Development");
    const otherProjects = projects.filter((p) => p.category === "Other");

    return (
        <>
            <h3>Web Development</h3>
            <div className="projects-section">
                <button
                    className="projects-arrow"
                    onClick={() => scroll(webRef, -1)}
                >
                    &#8592;
                </button>
                <div className="projects-wrapper" ref={webRef}>
                    {webProjects.map((p) => (
                        <ProjectCard
                            key={p.title}
                            title={p.title}
                            description={p.description}
                            link={p.link}
                            img1={p.img1}
                            img2={p.img2}
                            alt={p.alt}
                            github={p.github}
                        />
                    ))}
                </div>
                <button
                    className="projects-arrow"
                    onClick={() => scroll(webRef, 1)}
                >
                    &#8594;
                </button>
            </div>
            <h3>Other Projects</h3>
            <div className="projects-section">
                <button
                    className="projects-arrow"
                    onClick={() => scroll(otherRef, -1)}
                >
                    &#8592;
                </button>
                <div className="projects-wrapper" ref={otherRef}>
                    {otherProjects.map((p) => (
                        <ProjectCard
                            key={p.title}
                            title={p.title}
                            description={p.description}
                            link={p.link}
                            img1={p.img1}
                            img2={p.img2}
                            alt={p.alt}
                            github={p.github}
                        />
                    ))}
                </div>
                <button
                    className="projects-arrow"
                    onClick={() => scroll(otherRef, 1)}
                >
                    &#8594;
                </button>
            </div>
        </>
    );
}

export default Projects;
