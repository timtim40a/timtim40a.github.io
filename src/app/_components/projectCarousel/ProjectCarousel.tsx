// app/projects/ProjectsCarousel.tsx — Client Component
"use client";
import Carousel from "@/app/_components/carousel/Carousel";
import ProjectCard from "@/app/_components/projectCard/ProjectCard";
import type Project from "@/app/_types/Project";

type Props = {
    title: string;
    projects: Project[];
};

export default function ProjectsCarousel({ title, projects }: Props) {
    return (
        <Carousel
            title={title}
            items={projects}
            getKey={(p) => p.title}
            renderItem={(p) => <ProjectCard {...p} />}
        />
    );
}
