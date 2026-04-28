import Link from "next/link";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="header__title-container">
                <h1 className="header__title">Tymur Soroka</h1>
                <h2 className="header__subtitle">{"<tee-moor saw-raw-kah>"}</h2>
            </div>
            <nav className="header__nav">
                <Link className="nav__link" href="/">
                    Home
                </Link>
                <Link className="nav__link" href="/artworks">
                    Artworks
                </Link>
                <Link className="nav__link" href="/projects">
                    Projects
                </Link>
                <Link className="nav__link" href="/blog">
                    Blog
                </Link>
            </nav>
        </header>
    );
}

export default Header;
