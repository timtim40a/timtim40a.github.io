import HoverImage from "../hoverImage/HoverImage";
import "./ProjectCard.css";

function ProjectCard({
    title,
    description,
    link,
    img1,
    img2,
    alt = title,
    github,
}: {
    title: string;
    description: string;
    link: string;
    img1: string;
    img2?: string;
    alt?: string;
    github?: string;
}) {
    return (
        <div className="project-card">
            <div className="project-card__text-container">
                <h2 className="project-card__title">{title}</h2>
                <p className="project-card__description">{description}</p>
            </div>
            {img2 ? (
                <HoverImage
                    src1={img1}
                    src2={img2}
                    alt={alt}
                    link={link ? link : ""}
                    github={github ? github : ""}
                />
            ) : (
                <img className="project-card__image" src={img1} alt={alt} />
            )}
        </div>
    );
}

export default ProjectCard;
