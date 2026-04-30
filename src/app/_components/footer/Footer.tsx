import styles from "./footer.module.css";

function Footer() {
    return (
        <>
            <footer className={styles.container}>
                <div className={styles.logoContainer}>
                    <a href="https://www.github.com/timtim40a">
                        <img
                            className={styles.logo}
                            src="/github-white-icon.webp"
                        ></img>
                    </a>
                    <a href="https://www.linkedin.com/in/tymur-soroka">
                        <img
                            className={styles.logo}
                            src="/linkedin-icon.png"
                        ></img>
                    </a>
                    <a href="https://drive.google.com/uc?export=download&id=1NjKA0Db2y4gTaLnAR57I3sNJatZiB9E9">
                        <img className={styles.logo} src="/cv-icon.svg"></img>
                    </a>
                </div>
                <div className={styles.textContainer}>
                    <p className={styles.text}>
                        Email: timtim40a@gmail.com{" "}
                        <a href="mailto:timtim40a@gmail.com">✉️</a>
                    </p>
                    <p className={styles.text}>
                        © 2025 Tymur Soroka. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
}

export default Footer;
