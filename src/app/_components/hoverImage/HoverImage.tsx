"use client";
import { useRouter } from "next/navigation";
import type { MouseEvent as ReactMouseEvent } from "react";
import styles from "./hoverImage.module.css";

function HoverImage({
    src1,
    src2,
    alt,
    className = "",
    title = alt,
    link = alt,
    github,
}: {
    src1: string;
    src2: string;
    alt: string;
    className?: string;
    title?: string;
    link?: string;
    github?: string;
}) {
    const router = useRouter();

    const handleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setTimeout(() => {
            if (/^(https?:\/\/|\/\/|mailto:|tel:)/i.test(link)) {
                // external link — open in new tab
                window.open(link, "_blank", "noopener,noreferrer");
            } else {
                // internal route
                router.push("/" + link.toLowerCase());
            }
        }, 100);
    };

    const handleGithubClick = (e: ReactMouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        window.open(github, "_blank", "noopener,noreferrer");
    };

    return (
        <div
            className={styles.container + " " + className}
            onClick={handleClick}
        >
            <img
                src={src1}
                alt={alt}
                className={styles.image + " " + styles.imageDefault}
            />
            <img
                src={src2}
                alt={alt}
                className={styles.image + " " + styles.imageHover}
            />
            <div className={styles.linksContainer}>
                {alt || title ? (
                    <h3 className={styles.title} onClick={handleClick}>
                        {title}
                    </h3>
                ) : null}
                {github && github.includes("https://github.com") ? (
                    <h3 className={styles.title} onClick={handleGithubClick}>
                        repo
                    </h3>
                ) : null}
            </div>
        </div>
    );
}

export default HoverImage;
