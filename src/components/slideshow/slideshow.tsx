import { useEffect, useState } from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

interface CloudinaryResource {
    public_id: string;
    secure_url: string;
}

interface CloudinaryListResponse {
    resources?: CloudinaryResource[];
}

const CLOUD_NAME = "dvoys2ipv"; // TODO: Replace with actual Cloudinary cloud name
const TAG = "artwork"; // TODO: Replace with actual tag

const Slideshow = () => {
    const [images, setImages] = useState<CloudinaryResource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function loadImages() {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${TAG}.json`,
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

        loadImages();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        if (images.length <= 1) return;

        // const timer = window.setInterval(() => {
        //     setIndex((prev) => (prev + 1) % images.length);
        // }, 3500);

        // return () => window.clearInterval(timer);
    }, [images.length]);

    if (loading) return <p>Loading artworks...</p>;
    if (error) return <p>Failed to load artworks: {error}</p>;
    if (!images.length) return <p>No artworks found for tag: {TAG}</p>;
    return (
        <div className="slide-container">
            <Fade>
                {images.map((image) => (
                    <div key={image.public_id}>
                        <img
                            style={{ width: "100%" }}
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
