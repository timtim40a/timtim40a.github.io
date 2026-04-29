import styles from "./footer.module.css";

function Footer() {
    return (
        <>
            <footer className={styles.container}>
                <a href="https://www.github.com/timtim40a">
                    <img
                        className={styles.logo}
                        src="/github-white-icon.webp"
                    ></img>
                </a>
                <p className={styles.text}>
                    © 2025 Tymur Soroka. All rights reserved.
                </p>
            </footer>
        </>
    );
}

export default Footer;
