import { useNavigate } from "react-router-dom";
import "./HoverImage.css"

function HoverImage({ src1, src2, alt, title=alt }: { src1: string; src2: string; alt: string; title?: string }) {

    const navigate = useNavigate();

    const handleClick = () => {
        setTimeout(() => navigate('/'+alt.toLowerCase()), 100);
    };

    return (
        <div className="hover-image-container" onClick={handleClick}>
            <img src={src1} alt={alt} className="hover-image hover-image--default" />
            <img src={src2} alt={alt} className="hover-image hover-image--hover" />
            <h2 className="hover-image__title">{title}</h2>
        </div>
    )
}

export default HoverImage