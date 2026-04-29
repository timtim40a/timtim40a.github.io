import HoverImage from "./_components/hoverImage/HoverImage";
import TechLabel from "./_components/techLabel/TechLabel";
import styles from "./page.module.css";

function Home() {
    return (
        <>
            <main className={styles.main}>
                <div>
                    <h2 className={styles.title}>Hi!</h2>
                    <p className={styles.bio}>
                        My name is in the header. I am a Full-stack software
                        developer and multimedia artist based in Brighton. Click
                        the photos below to get to know my work better.
                    </p>
                    <div className={styles.techstack}>
                        <TechLabel label="TypeScript" />
                        <TechLabel label="React" />
                        <TechLabel label="Redux" />
                        <TechLabel label="Next.js" />
                        <TechLabel label="Node.js" />
                        <TechLabel label="Python" />
                        <TechLabel label="Express" />
                        <TechLabel label="PostgreSQL" />
                        <TechLabel label="Headless CMS" />
                        <TechLabel label="Figma" />
                    </div>
                </div>
                <div className={styles.topicContainer}>
                    <HoverImage
                        src1="tim_art.png"
                        src2="tim_art_alt1.png"
                        alt="Artworks"
                        className={styles.hoverImage}
                    />
                    <HoverImage
                        src1="tim2.png"
                        src2="tim4.png"
                        alt="Blog"
                        className={styles.hoverImage}
                    />
                    <HoverImage
                        src1="tim_prog.png"
                        src2="tim_prog_alt2.png"
                        alt="Projects"
                        className={styles.hoverImage}
                    />
                </div>
            </main>
        </>
    );
}

export default Home;
