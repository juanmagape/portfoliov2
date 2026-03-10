import { NavLink } from "react-router-dom"
import '../index.css'

function Navbar() {
    return (
        <nav className="sidebar">
            <NavLink to="/" className="nav-title">
                juanmagape
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-item activo' : 'nav-item'}>
                Projects
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-item activo' : 'nav-item'}>
                About
            </NavLink>
        </nav>
    )
}
export default Navbar