"use client";
import { useEffect, useRef, useState } from "react";
import ArtworkCard from "../_components/artworkCard/ArtworkCard";
import styles from "./artworks.module.css";

type Artwork = {
    type: "artwork" | null;
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
    console.log(artworks, visualArtworks, otherArtworks);

    return (
        <>
            <p className={styles.description}>
                I practice multimedia art using various tools. I explore various
                topics and mediums that appear alongside modern technologies,
                integrating them into understandable formats. I stand for
                ethical AI usage and therefore disapprove of AI assisted
                "creativity"
            </p>
            <h2>Visual Art</h2>
            <div className={styles.section}>
                <button
                    className={styles.arrow}
                    onClick={() => scroll(visualRef, -1)}
                >
                    &#8592;
                </button>
                <div className={styles.wrapper} ref={visualRef}>
                    {visualArtworks.map((p) => (
                        <ArtworkCard
                            type={p.type}
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
                    className={styles.arrow}
                    onClick={() => scroll(visualRef, 1)}
                >
                    &#8594;
                </button>
            </div>
            <h2>Miscellaneous Art</h2>
            <div className={styles.section}>
                <button
                    className={styles.arrow}
                    onClick={() => scroll(otherRef, -1)}
                >
                    &#8592;
                </button>
                <div className={styles.wrapper} ref={otherRef}>
                    {otherArtworks.map((p) => (
                        <ArtworkCard
                            type={p.type}
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
                    className={styles.arrow}
                    onClick={() => scroll(otherRef, 1)}
                >
                    &#8594;
                </button>
            </div>
        </>
    );
}

export default artworks;
