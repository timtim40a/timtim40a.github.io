import HoverImage from "../components/hoverImage/HoverImage"
import TechLabel from "../components/techLabel/TechLabel"
import "./Home.css"

function Home() {

    return (
        <>
            <main className="home__main">
                <div>
                    <h2 className="home__title">Hi!</h2>
                    <p className="home__bio">My name is in the header. I am a Full-stack software developer based in Brighton.</p>
                    <div className="home__techstack">
                        <TechLabel label="TypeScript" />
                        <TechLabel label="React" />
                        <TechLabel label="Redux" />
                        <TechLabel label="Node.js" />
                        <TechLabel label="Python" />
                        <TechLabel label="Express" />
                        <TechLabel label="PostgreSQL" />
                </div>
                </div>
                <div className="topic-container">
                    <HoverImage src1="tim2.png" src2="tim4.png" alt="Blog" />
                    <HoverImage src1="tim3.png" src2="tim5.png" alt="Projects" />
                </div>
            </main>
        </>
    )
}

export default Home