"use client";
import { useEffect, useRef, useState } from "react";
import ProjectCard from "../_components/projectCard/ProjectCard";
import styles from "./projects.module.css";

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

    const webProjects = projects.filter(
        (p) => p.category === "Web Development"
    );
    const otherProjects = projects.filter((p) => p.category === "Other");

    return (
        <>
            <h2>Web Development</h2>
            <div className={styles.section}>
                <button
                    className={styles.arrow}
                    onClick={() => scroll(webRef, -1)}
                >
                    &#8592;
                </button>
                <div className={styles.wrapper} ref={webRef}>
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
                    className={styles.arrow}
                    onClick={() => scroll(webRef, 1)}
                >
                    &#8594;
                </button>
            </div>
            <h2>Other Projects</h2>
            <div className={styles.section}>
                <button
                    className={styles.arrow}
                    onClick={() => scroll(otherRef, -1)}
                >
                    &#8592;
                </button>
                <div className={styles.wrapper} ref={otherRef}>
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
                    className={styles.arrow}
                    onClick={() => scroll(otherRef, 1)}
                >
                    &#8594;
                </button>
            </div>
            <p className={styles.description}>
                I have experience in web development, having created multiple
                projects using <strong>React</strong>, <strong>Node.js</strong>,
                and other technologies. These include innovative solutions{" "}
                <strong>utilising AI</strong>; regular, well structured
                full-stack web-apps (database management, user authentication,
                API integration), and quirky creative projects that explore the
                intersection of technology and art. I love to (and proud to be
                able to) push the boundaries of what's possible with web
                technologies.
            </p>
        </>
    );
}

export default Projects;
