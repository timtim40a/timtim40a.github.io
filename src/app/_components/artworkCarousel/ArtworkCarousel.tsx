// app/artworkCarousel/artworkCarousel.tsx — Client Component
"use client";
import Carousel from "@/app/_components/carousel/Carousel";
import ArtworkCard from "@/app/_components/artworkCard/ArtworkCard";
import type Artwork from "@/app/_types/Artwork";

type Props = {
    title: string;
    artworks: Artwork[];
};

export default function ArtworkCarousel({ title, artworks }: Props) {
    return (
        <Carousel
            title={title}
            items={artworks}
            getKey={(a) => a.title}
            renderItem={(a) => <ArtworkCard {...a} />}
        />
    );
}
