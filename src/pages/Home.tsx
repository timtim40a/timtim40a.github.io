import HoverImage from "../components/hoverImage/HoverImage"
import "./Home.css"

function Home() {

    return (
        <>
            <div className="topic-container">
                <HoverImage src1="tim2.png" src2="tim4.png" alt="Blog" />
                <HoverImage src1="tim3.png" src2="tim5.png" alt="Projects" />
            </div>
        </>
    )
}

export default Home