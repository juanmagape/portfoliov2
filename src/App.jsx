import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home'
import Projects from './components/projects'
import About from './components/about'

function App() {
  return (
    <main className="main-content">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </main>
  )
}
export default App