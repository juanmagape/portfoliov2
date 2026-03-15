function About() {
    const experiences = [
        {
            title: "IT Support Technician",
            company: "Fractalia",
            type: "Part-time",
            period: "Nov 2024 – Present",
            location: "Barcelona, Spain · Hybrid",
            description: "Specialized technical support for Grupo CaixaBank, assisting with hardware and software incidents.",
            current: true,
        },
        {
            title: "Shop Assistant",
            company: "ITSTAR IRELAND",
            type: "Internship",
            period: "Mar 2025 – Apr 2025",
            location: "Dublin, Ireland · On-site",
            description: "Customer service and advice on accessories for mobile devices and computers.",
            current: false,
        },
        {
            title: "IT Staff",
            company: "STUCOM Centre d'Estudis",
            type: "Internship",
            period: "Jun 2024 – Oct 2024",
            location: "Barcelona, Spain · On-site",
            description: "Maintenance and repair of computer systems to optimize performance and extend their useful life.",
            current: false,
        },
    ];

    return (
        <div className="about-wrapper">
            <h1>About me</h1>

            <div className="about-content">
                <p>
                    Hey! I'm Juan Manuel, a support technician based in <strong>Barcelona</strong> with over a year of hands-on experience at CaixaBank. Currently pursuing my DAM (Cross-Platform Application Development) degree while sharpening my web development skills on the side.
                </p>
                <p>
                    My background in technical support gave me a solid foundation in troubleshooting and understanding how systems work under the hood. Now I'm channeling that into building web-oriented applications and tools that actually solve problems.
                </p>
                <p>
                    When I'm not coding or fixing someone's computer, you'll probably find me tinkering with side projects or exploring new technologies.
                </p>
                <p className="open-to-work">
                    Currently <strong>open to work</strong> — feel free to reach out if you have an interesting opportunity.
                </p>
            </div>

            <div className="experience-section">
                <h2>Work Experience</h2>

                <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                        <div className="experience-item" key={index}>
                            <div className="experience-line">
                                <div className={`experience-dot ${exp.current ? "dot-current" : ""}`} />
                                {index < experiences.length - 1 && <div className="experience-connector" />}
                            </div>

                            <div className="experience-card">
                                <div className="experience-header">
                                    <div>
                                        <h3 className="experience-title">{exp.title}</h3>
                                        <span className="experience-company">{exp.company}</span>
                                        <span className="experience-type"> · {exp.type}</span>
                                    </div>
                                    {exp.current && <span className="experience-badge">Current</span>}
                                </div>

                                <div className="experience-meta">
                                    <span className="experience-period">{exp.period}</span>
                                    <span className="experience-separator">·</span>
                                    <span className="experience-location">{exp.location}</span>
                                </div>

                                <p className="experience-description">{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;