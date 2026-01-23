import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function Router() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
            <Footer />
        </>
    );
}

export default Router;
