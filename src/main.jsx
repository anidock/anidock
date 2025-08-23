import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './lib/AuthContext.jsx'
import App from './pages/Home.jsx'
import AnimeDetail from './pages/AnimeDetail.jsx'
import AuthPage from './pages/Auth.jsx'
import Community from './pages/Community.jsx'
import Profile from './pages/Profile.jsx'
import Library from './pages/Library.jsx'
import ProtectedRoute from './lib/ProtectedRoute.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/anime/:idSlug" element={<AnimeDetail />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
