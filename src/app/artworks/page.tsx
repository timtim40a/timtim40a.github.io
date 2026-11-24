import styles from "./artworks.module.css";
import artworks from "../../../public/artworks/artworks.json";
import TileCarousel from "../_components/tileCarousel/TileCarousel";

function Artworks() {
    return (
        <main>
            <p className={styles.description}>
                I practice multimedia art using various tools. I explore various
                topics and mediums that appear alongside modern technologies,
                integrating them into understandable formats. I stand for
                ethical AI usage and therefore disapprove of AI assisted
                &quot;creativity&quot;
            </p>
            <TileCarousel title="Artworks" tiles={artworks} />
        </main>
    );
}

export default Artworks;
