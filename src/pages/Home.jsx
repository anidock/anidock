import { useEffect, useState } from "react";
import { fetchSection } from "../lib/anilist";
import { Link } from "react-router-dom";

function Section({ title, type }){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(()=>{
    fetchSection(type).then(setItems).catch(e=>setErr(e.message)).finally(()=>setLoading(false));
  }, [type]);

  return (
    <div className="panel">
      <div className="form-row" style={{justifyContent:"space-between"}}>
        <h3>{title}</h3>
        <span className="badge">{items.length} titles</span>
      </div>
      {loading && <p>Loading…</p>}
      {err && <p style={{color:"#f88"}}>{err}</p>}
      {!loading && !err && (
        <table className="table">
          <thead>
            <tr><th></th><th>Title</th><th>Format</th><th>Ep</th><th>Score</th><th>Year</th><th>Status</th></tr>
          </thead>
          <tbody>
          {items.map(m => (
            <tr key={m.id}>
              <td style={{width:80}}>
                <Link to={`/anime/${m.id}`}>
                  <img src={m.coverImage?.large || m.coverImage?.medium || m.bannerImage || "https://via.placeholder.com/80x110?text=No+Image"} alt="" style={{width:64,borderRadius:6}} />
                </Link>
              </td>
              <td><Link to={`/anime/${m.id}`}>{m.title.english || m.title.romaji}</Link></td>
              <td>{m.format}</td>
              <td>{m.episodes ?? "-"}</td>
              <td>{m.averageScore ?? "-"}</td>
              <td>{m.seasonYear ?? "-"}</td>
              <td>{m.status}</td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function Home(){
  return (
    <div className="container">
      <div className="panel hero">
        <img className="hero-poster" src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151379-wRU6qBX5nR8a.jpg" alt="" />
        <div>
          <div className="hero-title">Welcome back to Anidock</div>
          <p className="badge">Live data via AniList • MAL-style tables • Your watchlist saved with Supabase</p>
        </div>
      </div>

      <Section title="Trending" type="TRENDING" />
      <Section title="Popular" type="POPULAR" />
      <Section title="Top Rated" type="TOP" />
      <Section title="Upcoming" type="UPCOMING" />
    </div>
  );
}
