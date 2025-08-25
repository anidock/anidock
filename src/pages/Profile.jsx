import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function Profile(){
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    if(!user){ navigate("/login"); return; }
    supabase.from("user_anime_list").select("*").eq("user_id", user.id)
      .then(({ data }) => setRows(data || []));
  }, [user]);

  const stats = useMemo(()=>{
    const by = rows.reduce((acc, r)=>{
      acc[r.status] = (acc[r.status]||0)+1;
      return acc;
    }, {});
    return by;
  }, [rows]);

  return (
    <div className="container">
      <div className="panel">
        <h2>Profile</h2>
        <p className="badge">{user?.email}</p>
      </div>

      <div className="panel grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))"}}>
        {["WATCHING","PLANNING","COMPLETED","DROPPED"].map(k => (
          <div key={k} className="card">
            <div style={{fontSize:12,color:"#9aa3b2"}}>{k}</div>
            <div style={{fontSize:22,fontWeight:800}}>{stats[k] || 0}</div>
          </div>
        ))}
      </div>

      <div className="panel">
        <h3>Your List</h3>
        {rows.length===0 ? <p>No entries yet. Browse anime and add to your list.</p> : (
          <table className="table">
            <thead><tr><th>Anime ID</th><th>Status</th><th>Score</th><th>Progress</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td><Link to={`/anime/${r.anime_id}`}>#{r.anime_id}</Link></td>
                  <td>{r.status}</td>
                  <td>{r.score ?? "-"}</td>
                  <td>{r.progress ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
