import ProjectCard from "../components/projectCard/ProjectCard";

function Projects() {
    return (
        <>
            <h1>My projects!</h1>
            <ProjectCard
                title="A Home"
                description="Three.js based random house generator. To be used as an ever changing interactive postcard. Gifted in 2026."
                link="https://ahome.timtimsays.art"
                img1="ahome.jpg"
                img2="ahome.jpg"
                alt="link"
                github="https://github.com/timtim40a/ahome"
            ></ProjectCard>
            <ProjectCard
                title="Silver Lining"
                description="Typescript, React, Redux accessibility tool that can convert enormous volumes of texts like your favourite novels into a single scrolling marquee line. Regulate the speed, font size and more! Isn't it awesome?"
                link="https://silverlining.timtimsays.art"
                img1="silverlining.png"
                img2="silverlining.png"
                alt="link"
                github="https://github.com/timtim40a/silverlining"
            ></ProjectCard>
            <ProjectCard
                title="Graph Algorithms Visualiser"
                description="The visualiser offers 7 different algorithms to see in action as well as weight-randomization, switching graph's mode between directed and undirected, creating new nodes and edges, and controlling the algorithm's animations. You can also export yours and import community graphs"
                link="https://graph-algorithms-visualiser-psi.vercel.app/"
                img1="graph-algorithms-visualiser.png"
                img2="graph-algorithms-visualiser2.png"
                alt="link"
                github="https://github.com/timtim40a/graph-algorithms-visualiser"
            ></ProjectCard>
            <ProjectCard
                title="Novel Forest"
                description="A creative platform where users can generate ideas for their creative projects such as novels, paintings or any other art pieces. Browse a curated book store, generate ideas, all powered by APIs and built with HTML, CSS, and JavaScript"
                link="https://technative-academy.github.io/novel-forest/ask/"
                img1="novel-forest.png"
                img2="novel-forest2.png"
                alt="link"
                github="https://github.com/timtim40a/novel-forest"
            ></ProjectCard>
            <ProjectCard
                title="Framebox-Backend"
                description="A backend Express application providing an API for CRUD operations on users/authentication, playlists (collections), and movies (items). It uses PostgreSQL for database management and is hosted on Railway. Key NPM packages include pg, slugify, and jsonwebtoken."
                link="https://framebox-backend-production.up.railway.app/api/docs/"
                img1="framebox.png"
                img2="framebox2.png"
                alt="link"
                github="https://github.com/technative-academy/FrameBox-Backend"
            ></ProjectCard>
            <ProjectCard
                title="Kochivnyky"
                description='TypeScript, React, React Hooks, Python+Django. A website created specifically as a part of Playback Performance "..." for the audience to suggest possible names for it.'
                link="https://timtim40a.github.io/kochivnyky/"
                img1="kochivnyky.png"
                img2="kochivnyky2.png"
                alt="link"
                github="https://github.com/timtim40a/kochivnyky"
            ></ProjectCard>
            <ProjectCard
                title="Cellular Automaton"
                description="Pyhton, tkinter. An Automaton able to simulate Convay`s game of life and other rulesets with customizable themes, speeds and a generation counter for you GoL experiments!"
                link=""
                img1="automaton.png"
                img2="automaton2.png"
                alt=""
                github="https://github.com/timtim40a/Automaton"
            ></ProjectCard>
        </>
    );
}

export default Projects;
