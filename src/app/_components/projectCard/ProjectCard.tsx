import HoverImage from "../hoverImage/HoverImage";
import type Project from "@/app/_types/Project";
import "./ProjectCard.css";

function ProjectCard({
    title,
    description,
    link,
    img1,
    img2,
    github,
}: Project) {
    return (
        <div className="project-card">
            <div className="project-card__text-container">
                <h3 className="project-card__title">{title}</h3>
                <p className="project-card__description">{description}</p>
            </div>
            <HoverImage
                src1={img1}
                src2={img2 ?? img1}
                alt={title}
                label="link"
                href={link}
                github={github}
                className="project-card__hover-image"
            />
        </div>
    );
}

export default ProjectCard;
