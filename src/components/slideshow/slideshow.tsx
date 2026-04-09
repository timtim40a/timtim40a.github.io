import { useEffect, useState } from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./slideshow.css";

interface CloudinaryResource {
    public_id: string;
    secure_url: string;
}

interface CloudinaryListResponse {
    resources?: CloudinaryResource[];
}

const CLOUD_NAME = "dvoys2ipv";

const Slideshow = ({ tag }: { tag: string }) => {
    const [images, setImages] = useState<CloudinaryResource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function loadImages(tag: string) {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${tag}.json`,
                    { signal: controller.signal }
                );

                if (!res.ok) {
                    throw new Error(`Request failed: ${res.status}`);
                }

                const data: CloudinaryListResponse = await res.json();
                setImages(data.resources ?? []);
            } catch (err) {
                if (err instanceof Error && err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        loadImages(tag);
        return () => controller.abort();
    }, [tag]);

    if (loading) return <p>Loading artworks...</p>;
    if (error) return <p>Failed to load artworks: {error}</p>;
    if (!images.length) return <p>No artworks found for tag: {tag}</p>;
    return (
        <div className="slide-container">
            <Fade arrows={false}>
                {images.map((image) => (
                    <div key={image.public_id} className="slide">
                        <img
                            src={image.secure_url}
                            alt={image.public_id}
                        />
                    </div>
                ))}
            </Fade>
        </div>
    );
};

export default Slideshow;
