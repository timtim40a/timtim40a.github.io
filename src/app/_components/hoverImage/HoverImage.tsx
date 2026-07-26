"use client";
import { useRouter } from "next/navigation";
import type {
    KeyboardEvent as ReactKeyboardEvent,
    MouseEvent as ReactMouseEvent,
} from "react";
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

    function navigate() {
        setTimeout(() => {
            if (/^(https?:\/\/|\/\/|mailto:|tel:)/i.test(link)) {
                // external link — open in new tab
                window.open(link, "_blank", "noopener,noreferrer");
            } else {
                // internal route
                router.push("/" + link.toLowerCase());
            }
        }, 100);
    }

    function openGithub() {
        window.open(github, "_blank", "noopener,noreferrer");
    }

    function handleActivateKeyDown(
        e: ReactKeyboardEvent<HTMLDivElement>,
        action: () => void
    ) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            action();
        }
    }

    const handleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        navigate();
    };

    const handleGithubClick = (e: ReactMouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        openGithub();
    };

    return (
        <div
            className={styles.container + " " + className}
            role="link"
            tabIndex={0}
            aria-label={title || alt}
            onClick={handleClick}
            onKeyDown={(e) => handleActivateKeyDown(e, navigate)}
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
                    <h3
                        className={styles.title}
                        role="link"
                        tabIndex={0}
                        onClick={handleClick}
                        onKeyDown={(e) => handleActivateKeyDown(e, navigate)}
                    >
                        {title}
                    </h3>
                ) : null}
                {github && github.includes("https://github.com") ? (
                    <h3
                        className={styles.title}
                        role="link"
                        tabIndex={0}
                        onClick={handleGithubClick}
                        onKeyDown={(e) => handleActivateKeyDown(e, openGithub)}
                    >
                        repo
                    </h3>
                ) : null}
            </div>
        </div>
    );
}

export default HoverImage;
