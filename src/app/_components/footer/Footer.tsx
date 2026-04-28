import "./Footer.css";

function Footer() {
    return (
        <>
            <footer className="footer">
                <a href="https://www.github.com/timtim40a">
                    <img
                        className="footer__logo"
                        src="/github-white-icon.webp"
                    ></img>
                </a>
                <p className="footer__text">
                    © 2025 Tymur Soroka. All rights reserved.
                </p>
            </footer>
        </>
    );
}

export default Footer;
