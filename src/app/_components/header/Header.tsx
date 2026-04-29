import Link from "next/link";
import styles from "./header.module.css";

function Header() {
    return (
        <header className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Tymur Soroka</h1>
                <h2 className={styles.subtitle}>{"<tee-moor saw-raw-kah>"}</h2>
            </div>
            <nav className={styles.nav}>
                <Link className={styles.link} href="/">
                    Home
                </Link>
                <Link className={styles.link} href="/artworks">
                    Artworks
                </Link>
                <Link className={styles.link} href="/projects">
                    Projects
                </Link>
                <Link className={styles.link} href="/blog">
                    Blog
                </Link>
            </nav>
        </header>
    );
}

export default Header;
