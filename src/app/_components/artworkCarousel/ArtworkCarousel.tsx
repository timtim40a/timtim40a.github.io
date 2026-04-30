// app/artworkCarousel/artworkCarousel.tsx — Client Component
"use client";
import { useRef } from "react";
import ArtworkCard from "../artworkCard/ArtworkCard";
import styles from "./artworkCarousel.module.css";
import Artwork from "@/app/_types/Artwork";

type Props = {
    title: string;
    artworks: Artwork[];
};

export default function ArtworkCarousel({ title, artworks }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    function scroll(dir: number) {
        ref.current?.scrollBy({
            left: dir * ref.current.offsetWidth,
            behavior: "smooth",
        });
    }

    return (
        <>
            <h2>{title}</h2>
            <div className={styles.section}>
                <button
                    className={styles.arrow}
                    onClick={() => scroll(-1)}
                >
                    &#8592;
                </button>
                <div className={styles.wrapper} ref={ref}>
                    {artworks.map((a) => (
                        <ArtworkCard
                            key={a.title}
                            {...a}
                        />
                    ))}
                </div>
                <button
                    className={styles.arrow}
                    onClick={() => scroll(1)}
                >
                    &#8594;
                </button>
            </div>
        </>
    );
}
