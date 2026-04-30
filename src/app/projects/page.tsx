// app/projects/page.tsx — Server Component (no directive)
import projectsDataRaw from "../../../public/projects/projects.json";
import ProjectsCarousel from "../_components/projectCarousel/ProjectCarousel"; // client component

export default function ProjectsPage() {
    const webProjects = projectsDataRaw.filter(
        (p) => p.category === "Web Development"
    );
    const otherProjects = projectsDataRaw.filter((p) => p.category === "Other");

    return (
        <>
            <ProjectsCarousel title="Web Development" projects={webProjects} />
            <ProjectsCarousel title="Other Projects" projects={otherProjects} />
        </>
    );
}
