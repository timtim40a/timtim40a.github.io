"use client";
import { useRef } from "react";
import projectsDataRaw from "../../../public/projects/projects.json";
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

const projectsData = projectsDataRaw as Project[];

function Projects() {
    const webRef = useRef<HTMLDivElement>(null);
    const otherRef = useRef<HTMLDivElement>(null);

    const webProjects = projectsData.filter(
        (p) => p.category === "Web Development"
    );
    const otherProjects = projectsData.filter((p) => p.category === "Other");

    function scroll(ref: React.RefObject<HTMLDivElement | null>, dir: number) {
        if (ref.current) {
            ref.current.scrollBy({
                left: dir * ref.current.offsetWidth,
                behavior: "smooth",
            });
        }
    }

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
                        <ProjectCard key={p.title} {...p} />
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
                        <ProjectCard key={p.title} {...p} />
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
