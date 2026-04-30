import styles from "./artworks.module.css";
import artworksDataRaw from "../../../public/artworks/artworks.json";
import Artwork from "../_types/Artwork";
import ArtworkCarousel from "../_components/artworkCarousel/ArtworkCarousel";

const artworksData = artworksDataRaw as Artwork[];

function Artworks() {
    const visualArtworks = artworksData.filter(
        (p) => p.category === "Visual Art"
    );
    const otherArtworks = artworksData.filter(
        (p) => p.category !== "Visual Art"
    );

    return (
        <>
            <p className={styles.description}>
                I practice multimedia art using various tools. I explore various
                topics and mediums that appear alongside modern technologies,
                integrating them into understandable formats. I stand for
                ethical AI usage and therefore disapprove of AI assisted
                "creativity"
            </p>
            <ArtworkCarousel title="Visual Art" artworks={visualArtworks} />
            <ArtworkCarousel title="Other" artworks={otherArtworks} />
            
        </>
    );
}

export default Artworks;
