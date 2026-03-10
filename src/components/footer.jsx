import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="main-footer">
            <div className="social-links">
                <Link to="https://github.com/juanmagape" target='_blank'><i className="lni lni-github"></i></Link>
                <Link to="https://www.linkedin.com/in/juanma-gape/?locale=en_US" target='_blank'><i className="lni lni-linkedin" ></i></Link>
                <Link to="mailto:juanmagape.trb@gmail.com"><i className="lni lni-envelope-1"></i></Link>
            </div>
        </footer>
    )
}
export default Footer