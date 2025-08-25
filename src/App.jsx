import { Routes, Route, Navigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Anime from "./pages/Anime";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Activity from "./pages/Activity";
import AllReviews from "./pages/AllReviews";
import { useAuth } from "./context/AuthContext";

function Protected({ children }){
  const { user, loading } = useAuth();
  if(loading) return <div className="container"><p>Loading session…</p></div>;
  if(!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App(){
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/anime/:id" element={<Anime />} />
        <Route path="/profile" element={<Protected><Profile /></Protected>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/reviews" element={<AllReviews />} />
        <Route path="*" element={<main className="container"><div className="panel">Not Found</div></main>} />
      </Routes>
      <footer><div className="container">© {new Date().getFullYear()} Anidock</div></footer>
    </div>
  );
}
