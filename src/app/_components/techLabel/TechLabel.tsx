import "./TechLabel.css"

function TechLabel({ label }: { label: string }) {

    return (
        <div className="tech-label">
            {label}
        </div>
    )
}

export default TechLabel