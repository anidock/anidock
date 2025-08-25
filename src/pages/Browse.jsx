import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchAnime } from "../lib/anilist";

export default function Browse(){
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(!q) return;
    setLoading(true);
    searchAnime(q).then(setItems).finally(()=>setLoading(false));
  }, [q]);

  return (
    <div className="container">
      <div className="panel">
        <h3>Search results {q && `for "${q}"`}</h3>
        {loading && <p>Searching…</p>}
        {!loading && items.length === 0 && <p>Try searching something like "Naruto" or "Bleach".</p>}
        {!loading && items.length > 0 && (
          <table className="table">
            <thead><tr><th>Title</th><th>Format</th><th>Ep</th><th>Score</th><th>Year</th></tr></thead>
            <tbody>
              {items.map(m => (
                <tr key={m.id}>
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
      </div>
    </div>
  );
}
