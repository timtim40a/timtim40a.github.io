import type TileData from "@/app/_types/Tile";
import labels from "../hoverImage/hoverImage.module.css";
import Slideshow from "../slideshow/slideshow";
import "./Tile.css";

const newTab = { target: "_blank", rel: "noopener noreferrer" };

function Tile({ title, description, link, img, slideshow, github }: TileData) {
    return (
        <div className="tile">
            <div className="tile__body">
                <div className="tile__square">
                    {slideshow ? (
                        <Slideshow tag={slideshow} />
                    ) : (
                        <img className="tile__image" src={img} alt="" />
                    )}
                    <h3 className="tile__title">{title}</h3>
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
                <p className="tile__description">{description}</p>
            </div>
        </div>
    );
}

export default Tile;
