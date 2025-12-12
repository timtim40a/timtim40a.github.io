import { Link } from "react-router-dom"
import './Header.css'

function Header() {
  return (
    <header className="header">
        <div className="header__title-container">
            <h1 className="header__title">Tymur Soroka</h1>
            <h2 className="header__subtitle">{"<tee-moor saw-raw-kah>"}</h2>
        </div>
            <nav className="header__nav">
                <Link className="nav__link" to="/">Home</Link>
                <Link className="nav__link" to="/projects">Projects</Link>
                <Link className="nav__link" to="/blog">Blog</Link>
            </nav>
    </header>
  )
}

export default Header