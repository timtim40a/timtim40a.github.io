// A project or artwork. `slideshow` is a Cloudinary tag shown instead of `img`.
type Tile = {
    title: string;
    description: string;
    link?: string;
    img?: string;
    slideshow?: string;
    github?: string;
};

export default Tile;
