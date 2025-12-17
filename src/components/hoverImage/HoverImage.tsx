import { useNavigate } from "react-router-dom";
import type { MouseEvent as ReactMouseEvent } from "react";
import "./HoverImage.css";

function HoverImage({
    src1,
    src2,
    alt,
    title = alt,
    link = alt,
    github,
}: {
    src1: string;
    src2: string;
    alt: string;
    title?: string;
    link?: string;
    github?: string;
}) {
    const navigate = useNavigate();

    const handleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setTimeout(() => {
            if (/^(https?:\/\/|\/\/|mailto:|tel:)/i.test(link)) {
                // external link — open in new tab
                window.open(link, "_blank", "noopener,noreferrer");
            } else {
                // internal route
                navigate("/" + link.toLowerCase());
            }
        }, 100);
    };

    const handleGithubClick = (e: ReactMouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        window.open(github, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="hover-image-container" onClick={handleClick}>
            <img
                src={src1}
                alt={alt}
                className="hover-image hover-image--default"
            />
            <img
                src={src2}
                alt={alt}
                className="hover-image hover-image--hover"
            />
            <div className="hover-image__links-container">
                {alt || title ? (
                    <h2 className="hover-image__title" onClick={handleClick}>
                        {title}
                    </h2>
                ) : null}
                {github && /^(https?:\/\/|\/\/|mailto:|tel:)/i.test(github) ? (
                    <h2
                        className="hover-image__title"
                        onClick={handleGithubClick}
                    >
                        repo
                    </h2>
                ) : null}
            </div>
        </div>
    );
}

export default HoverImage;
