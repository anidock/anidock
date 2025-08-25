import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar(){
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/browse?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav>
      <div className="nav-inner container">
        <NavLink to="/" className="brand"><b>Ani</b>dock</NavLink>
        <NavLink to="/browse">Browse</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/about">About</NavLink>

        <form className="search" onSubmit={onSearch}>
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search anime (e.g. Naruto)" />
          <button className="btn" type="submit">Search</button>
        </form>

        {user ? (
          <button className="btn secondary" onClick={logout} style={{marginLeft:8}}>Logout</button>
        ) : (
          <NavLink to="/login" className="btn" style={{marginLeft:8}}>Login</NavLink>
        )}
      </div>
    </nav>
  );
}

