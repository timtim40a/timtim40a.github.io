// app/projects/page.tsx — Server Component (no directive)
import projectsDataRaw from "../../../public/projects/projects.json";
import ProjectsCarousel from "../_components/projectCarousel/ProjectCarousel"; // client component
import styles from "./projects.module.css";


export default function ProjectsPage() {
    const webProjects = projectsDataRaw.filter(
        (p) => p.category === "Web Development"
    );
    const otherProjects = projectsDataRaw.filter((p) => p.category === "Other");

    return (
        <>
            <ProjectsCarousel title="Web Development" projects={webProjects} />
            <ProjectsCarousel title="Other Projects" projects={otherProjects} />
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
