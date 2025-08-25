import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchAnime, fetchSection } from "../lib/anilist";

export default function Browse(){
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popular, setPopular] = useState([]);

  useEffect(()=>{
    if(!q){
      fetchSection("POPULAR",1,20).then(setPopular).catch(()=>{});
      return;
    }
    let mounted = true;
    setLoading(true);
    searchAnime(q).then(res => { if(mounted) setItems(res); }).catch(()=>{}).finally(()=>{ if(mounted) setLoading(false); });
    return ()=> mounted = false;
  }, [q]);

  return (
    <div className="container">
      <div className="panel">
        <h3>Search results {q && `for "${q}"`}</h3>
        {loading && <p>Searching…</p>}
        {!loading && items.length === 0 && q && <p>No results found.</p>}
        {!loading && items.length > 0 && (
          <table className="table">
            <thead><tr><th></th><th>Title</th><th>Format</th><th>Ep</th><th>Score</th><th>Year</th></tr></thead>
            <tbody>
              {items.map(m => (
                <tr key={m.id}>
                  <td style={{width:80}}><Link to={`/anime/${m.id}`}><img src={m.coverImage?.medium || m.coverImage?.large || "https://via.placeholder.com/80x110?text=No+Image"} style={{width:64,borderRadius:6}}/></Link></td>
                  <td><Link to={`/anime/${m.id}`}>{m.title.english || m.title.romaji}</Link></td>
                  <td>{m.format}</td>
                  <td>{m.episodes ?? "-"}</td>
                  <td>{m.averageScore ?? "-"}</td>
                  <td>{m.seasonYear ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!q && popular.length>0 && (
          <div style={{marginTop:12}}>
            <h4>Popular</h4>
            <table className="table">
              <thead><tr><th></th><th>Title</th><th>Score</th></tr></thead>
              <tbody>
                {popular.map(m=>(
                  <tr key={m.id}><td style={{width:80}}><Link to={`/anime/${m.id}`}><img src={m.coverImage?.medium||m.coverImage?.large||"https://via.placeholder.com/80x110?text=No+Image"} style={{width:64,borderRadius:6}}/></Link></td><td><Link to={`/anime/${m.id}`}>{m.title.english||m.title.romaji}</Link></td><td>{m.averageScore??"-"}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
