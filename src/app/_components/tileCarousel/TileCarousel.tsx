"use client";
import Carousel from "@/app/_components/carousel/Carousel";
import Tile from "@/app/_components/tile/Tile";
import type TileData from "@/app/_types/Tile";

// Exists because renderItem (a function) can't be passed from a server page.
export default function TileCarousel({
    title,
    tiles,
}: {
    title: string;
    tiles: TileData[];
}) {
    return (
        <Carousel
            title={title}
            items={tiles}
            getKey={(t) => t.title}
            renderItem={(t) => <Tile {...t} />}
        />
    );
}
