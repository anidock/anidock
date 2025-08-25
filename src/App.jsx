import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Anime from "./pages/Anime";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import About from "./pages/About";

export default function App(){
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/anime/:id" element={<Anime />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<main className='container py-10'>Not Found</main>} />
      </Routes>
    </div>
  );
}
