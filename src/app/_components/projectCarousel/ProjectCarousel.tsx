// app/projects/ProjectsCarousel.tsx — Client Component
"use client";
import { useRef } from "react";
import ProjectCard from "../../_components/projectCard/ProjectCard";
import styles from "./projectCarousel.module.css";
import type Project from "../../_types/Project";

type Props = {
    title: string;
    projects: Project[];
};

export default function ProjectsCarousel({ title, projects }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    function scroll(dir: number) {
        ref.current?.scrollBy({
            left: dir * ref.current.offsetWidth,
            behavior: "smooth",
        });
    }

    return (
        <>
            <h2>{title}</h2>
            <div className={styles.section}>
                <button className={styles.arrow} onClick={() => scroll(-1)}>
                    &#8592;
                </button>
                <div className={styles.wrapper} ref={ref}>
                    {projects.map((p) => (
                        <ProjectCard key={p.title} {...p} />
                    ))}
                </div>
                <button className={styles.arrow} onClick={() => scroll(1)}>
                    &#8594;
                </button>
            </div>
        </>
    );
}
