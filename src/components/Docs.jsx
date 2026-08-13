import { Link } from "react-router-dom"

function Docs() {
    return (
        <>
            <h1>Documentation</h1>

            <div className="project-list">
                <article>
                    <Link to="/azure">
                        <h2>Hybrid Cloud Infrastructure Lab</h2>
                    </Link>
                    <h4>Windows Server · Azure · Entra ID · PowerShell</h4>
                    <p>Complete documentation on deploying a hybrid network connecting an on-premise Active Directory with Microsoft Entra ID and secure IaaS access via Azure Bastion.</p>
                </article>

                {/* Aquí puedes ir añadiendo más artículos de documentación en el futuro */}
            </div>
        </>
    )
}

export default Docs