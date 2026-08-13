import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home'
import Projects from './components/projects'
import About from './components/about'
import AzureProject from './components/AzureProject'
import Docs from './components/Docs'

function App() {
  return (
    <main className="main-content">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/azure' element={<AzureProject />} />
        <Route path='/docs' element={<Docs />} />
      </Routes>
    </main>
  )
}
export default App