import Link from "next/link";
import styles from "./hoverImage.module.css";

const newTab = { target: "_blank", rel: "noopener noreferrer" };

function HoverImage({
    src1,
    src2,
    alt,
    label,
    href,
    github,
    className = "",
}: {
    src1: string;
    src2: string;
    alt: string;
    label: string;
    href?: string;
    github?: string;
    className?: string;
}) {
    const hrefTarget = href?.startsWith("http") ? newTab : {};
    const images = (
        <>
            <img src={src1} alt={alt} className={styles.image} />
            <img
                src={src2}
                alt=""
                className={`${styles.image} ${styles.imageHover}`}
            />
        </>
    );

    return (
        <div className={`${styles.container} ${className}`}>
            {/* Click target only — the label link below is the keyboard/screen reader stop. */}
            {href ? (
                <Link href={href} {...hrefTarget} tabIndex={-1} aria-hidden>
                    {images}
                </Link>
            ) : (
                images
            )}
            <div className={styles.linksContainer}>
                {href && (
                    <Link href={href} {...hrefTarget} className={styles.title}>
                        {label}
                    </Link>
                )}
                {github && (
                    <a href={github} {...newTab} className={styles.title}>
                        repo
                    </a>
                )}
            </div>
        </div>
    );
}

export default HoverImage;
