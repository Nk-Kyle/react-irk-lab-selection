import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Contact } from './pages/contact'
import { Manage } from './pages/manage'
import { Task } from './pages/task'
import { Leaderboard } from './pages/leaderboard'
import { NotFound } from './pages/notFound'
import { About } from './pages/about'
import { ProtectedRoute } from './components/protectedRoute'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// import { Analytics } from '@vercel/analytics/react'

import { getWithExpiry } from './utils/expiryStorage'

function App() {
  const navigate = useNavigate()
  const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG))
  getAnalytics(app)

  useEffect(() => {
    const token = getWithExpiry('irk-token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route
        path="/manage"
        element={<ProtectedRoute element={Manage} allowedRole="assistant" />}
      />
      <Route path="/task/:id" element={<Task />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    {/* <Analytics /> */}
    </div>
    
  )
}

export default App
