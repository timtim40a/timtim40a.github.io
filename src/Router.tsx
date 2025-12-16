import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Blog from "./pages/Blog"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"


function Router() {
    return (
        <>
            <Header />
            <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
            </Routes>
            </main>
            <Footer />
        </>
    )
}

export default Router