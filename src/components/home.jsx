import 'lineicons/dist/lineicons.css';
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="home-wrapper">
            <header className="home-hero">
                <h1>Hi, I'm Juan Manuel</h1>
                <p>trying to become a webdev.</p>
                <p>working as a it support</p>

                <div className="social-links">
                    <Link to="https://github.com/juanmagape" target='_blank' title='Juan Manuel on GitHub'>
                        <i className="lni lni-github"></i>
                    </Link>
                    <Link to="https://www.linkedin.com/in/juanma-gape/?locale=en_US" title='Juan Manuel on Linkedin' target='_blank'>
                        <i className="lni lni-linkedin"></i>
                    </Link>
                    <Link to="mailto:juanmagape.trb@gmail.com" title='Send an email to Juan Manuel'>
                        <i className="lni lni-envelope-1"></i>
                    </Link>
                </div>
            </header>

            <section className="project-list">
                <article>
                    <Link to="https://valo-esports.vercel.app" target='_blank'>
                        <h2>Valorant Esports</h2>
                    </Link>
                    <h4>React · CSS · Api</h4>
                    <p>A web application to track competitive Valorant teams, rosters, recent results, and upcoming matches using real-time data</p>
                </article>
                <article>
                    <Link to="https://poke-api-juanmagape.vercel.app" target='_blank'>
                        <h2>PokeApi</h2>
                    </Link>
                    <h4>JS · HTML · CSS · Api</h4>
                    <p>App to browse Pokémon stats and abilities using the PokéAPI</p>
                </article>
                <article>
                    <Link to="https://techsolve.vercel.app/" target='_blank'>
                        <h2>TechSolve</h2>
                    </Link>
                    <h4>HTML · CSS · JS · PHP</h4>
                    <p>A mock PC repair shop website. Browse components, peripherals, and check the troubleshooting guide for common tech headaches</p>
                </article>
                <article>
                    <Link to="https://ticket-system-juanmagape.vercel.app/" target='_blank'>
                        <h2>TicketFlow</h2>
                    </Link>
                    <h4>JS · CSS · HTML</h4>
                    <p>A webpage to track, assign, and resolve support tickets easily</p>
                </article>
            </section>
        </div>
    )
}
export default Home