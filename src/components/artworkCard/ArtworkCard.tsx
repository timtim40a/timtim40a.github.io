import Slideshow from "../slideshow/slideshow";
import "./ArtworkCard.css";

function ArtworkCard({
    type,
    title,
    description,
    link,
    img1,
    img2,
    alt = title,
}: {
    type: "artwork" | null;
    title: string;
    description: string;
    link: string;
    img1: string;
    img2?: string;
    alt?: string;
}) {
    return (
        <div className="artwork-card">
            <div className="artwork-card__image-container">
                {!type ? (
                    <img className="artwork-card__image" src={img1} alt={alt} />
                ) : (
                    <Slideshow tag={type} />
                )}
            </div>
            <div className="artwork-card__text-container">
                <h3 className="artwork-card__title">{title}</h3>
                <p className="artwork-card__description">{description}</p>
            </div>
        </div>
    );
}

export default ArtworkCard;
