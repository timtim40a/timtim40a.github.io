import { useEffect, useRef, useState } from "react";
import ArtworkCard from "../components/artworkCard/ArtworkCard";
import "./Artworks.css";

type Artwork = {
    title: string;
    description: string;
    link: string;
    img1: string;
    img2?: string;
    alt?: string;
    github?: string;
    category: string;
};

function artworks() {
    const visualRef = useRef<HTMLDivElement>(null);
    const otherRef = useRef<HTMLDivElement>(null);
    const [artworks, setArtworks] = useState<Artwork[]>([]);

    useEffect(() => {
        fetch("/artworks/artworks.json")
            .then((res) => res.json())
            .then((data: Artwork[]) => setArtworks(data));
    }, []);

    function scroll(ref: React.RefObject<HTMLDivElement | null>, dir: number) {
        if (ref.current) {
            ref.current.scrollBy({
                left: dir * ref.current.offsetWidth,
                behavior: "smooth",
            });
        }
    }

    const visualArtworks = artworks.filter((p) => p.category === "Visual Art");
    const otherArtworks = artworks.filter((p) => p.category !== "Visual Art");

    return (
        <>
            <h2>Visual Art</h2>
            <div className="artworks-section">
                <button
                    className="artworks-arrow"
                    onClick={() => scroll(visualRef, -1)}
                >
                    &#8592;
                </button>
                <div className="artworks-wrapper" ref={visualRef}>
                    {visualArtworks.map((p) => (
                        <ArtworkCard
                            key={p.title}
                            title={p.title}
                            description={p.description}
                            link={p.link}
                            img1={p.img1}
                            img2={p.img2}
                            alt={p.alt}
                        />
                    ))}
                </div>
                <button
                    className="artworks-arrow"
                    onClick={() => scroll(visualRef, 1)}
                >
                    &#8594;
                </button>
            </div>
            <h2>Miscellaneous Art</h2>
            <div className="artworks-section">
                <button
                    className="artworks-arrow"
                    onClick={() => scroll(otherRef, -1)}
                >
                    &#8592;
                </button>
                <div className="artworks-wrapper" ref={otherRef}>
                    {otherArtworks.map((p) => (
                        <ArtworkCard
                            key={p.title}
                            title={p.title}
                            description={p.description}
                            link={p.link}
                            img1={p.img1}
                            img2={p.img2}
                            alt={p.alt}
                        />
                    ))}
                </div>
                <button
                    className="artworks-arrow"
                    onClick={() => scroll(otherRef, 1)}
                >
                    &#8594;
                </button>
            </div>
        </>
    );
}

export default artworks;
