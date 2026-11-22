import type Project from "@/app/_types/Project";
import labels from "../hoverImage/hoverImage.module.css";
import "./ProjectCard.css";

const newTab = { target: "_blank", rel: "noopener noreferrer" };

function ProjectCard({ title, description, link, img1, github }: Project) {
    return (
        <div className="project-card">
            <div className="project-card__tile">
                <div className="project-card__square">
                    <img className="project-card__image" src={img1} alt="" />
                    <h3 className="project-card__title">{title}</h3>
                    <div className={labels.linksContainer}>
                        {link && (
                            <a href={link} {...newTab} className={labels.title}>
                                link
                            </a>
                        )}
                        {github && (
                            <a href={github} {...newTab} className={labels.title}>
                                repo
                            </a>
                        )}
                    </div>
                </div>
                <p className="project-card__description">{description}</p>
            </div>
        </div>
    );
}

export default ProjectCard;
