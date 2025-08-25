import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Library from './pages/Library'
import Community from './pages/Community'
export default function App(){
  return (<BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/library" element={<Library/>} />
      <Route path="/community" element={<Community/>} />
    </Routes>
  </BrowserRouter>)
}
