import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Home } from './pages/home'
import Login from './pages/login'
import { Contact } from './pages/contact'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('irk-token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default App
