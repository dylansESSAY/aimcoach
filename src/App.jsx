import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Upload from './pages/Upload'
import Breakdown from './pages/Breakdown'
import Routine from './pages/Routine'
import SkillRanks from './pages/SkillRanks'
import Progress from './pages/Progress'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/routine" element={<ProtectedRoute><Routine /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
        <Route path="/breakdown" element={<ProtectedRoute><Breakdown /></ProtectedRoute>} />
        <Route path="/ranks" element={<ProtectedRoute><SkillRanks /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App