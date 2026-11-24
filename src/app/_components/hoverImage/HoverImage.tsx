import Link from "next/link";
import styles from "./hoverImage.module.css";

function HoverImage({
    src1,
    src2,
    label,
    href,
    className,
}: {
    src1: string;
    src2: string;
    label: string;
    href: string;
    className: string;
}) {
    return (
        <div className={`${styles.container} ${className}`}>
            {/* Click target only — the label link below is the keyboard/screen reader stop. */}
            <Link href={href} tabIndex={-1} aria-hidden>
                <img src={src1} alt="" className={styles.image} />
                <img
                    src={src2}
                    alt=""
                    className={`${styles.image} ${styles.imageHover}`}
                />
            </Link>
            <div className={styles.linksContainer}>
                <Link href={href} className={styles.title}>
                    {label}
                </Link>
            </div>
        </div>
    );
}

export default HoverImage;
