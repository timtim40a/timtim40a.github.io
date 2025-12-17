import { useNavigate } from "react-router-dom";
import "./HoverImage.css";

function HoverImage({
    src1,
    src2,
    alt,
    title = alt,
    link = alt,
}: {
    src1: string;
    src2: string;
    alt: string;
    title?: string;
    link?: string;
}) {
    const navigate = useNavigate();

    const handleClick = () => {
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
            {alt || title ? (
                <h2 className="hover-image__title">{title}</h2>
            ) : null}
        </div>
    );
}

export default HoverImage;
