import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnime } from "../lib/anilist";
import { supabase } from "../lib/supabaseClient";
import ReviewsList from "../components/ReviewsList";
import ReviewForm from "../components/ReviewForm";
import RatingsChart from "../components/RatingsChart";
import { useAuth } from "../context/AuthContext";

const statuses = ["PLANNING","WATCHING","COMPLETED","DROPPED"];

export default function Anime(){
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("PLANNING");
  const [score, setScore] = useState("");
  const [progress, setProgress] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  useEffect(()=>{
    getAnime(id).then(setData).finally(()=>setLoading(false));
  }, [id]);

  const save = async () => {
    if(!user){ setMessage("Login to manage your list."); return; }
    const row = {
      user_id: user.id,
      anime_id: Number(id),
      status,
      score: score ? Number(score) : null,
      progress: progress ? Number(progress) : null
    };
    // upsert by unique (user_id, anime_id)
    const { error } = await supabase
      .from("user_anime_list")
      .upsert(row, { onConflict: "user_id,anime_id" });
    setMessage(error ? error.message : "Saved ✅");
  };

  if(loading) return <div className="container"><p>Loading…</p></div>;
  if(!data) return <div className="container"><p>Not found.</p></div>;

  return (
    <div className="container">

      <div className="panel">
        <h3>Community Ratings</h3>
        <RatingsChart animeIds={[Number(id)]} />
      </div>
      <div className="panel hero">
        {data.coverImage?.extraLarge && <img className="hero-poster" src={data.coverImage.extraLarge} alt="" />}
        <div>
          <div className="hero-title">{data.title.english || data.title.romaji}</div>
          <p style={{color:"#9aa3b2"}}>{data.genres?.join(" • ")} · {data.seasonYear} · {data.format} · {data.status}</p>
          <p dangerouslySetInnerHTML={{__html: (data.description||"").replace(/\n/g," ")}}></p>
        </div>
      </div>

      <div className="panel">
        <h3>Your List</h3>
        <div className="form-row" style={{marginTop:10}}>
          <label>Status</label>
          <select value={status} onChange={e=>setStatus(e.target.value)}>
            {statuses.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
          <label>Score (1-10)</label>
          <input type="number" min="1" max="10" value={score} onChange={e=>setScore(e.target.value)} style={{width:90}}/>
          <label>Progress</label>
          <input type="number" min="0" value={progress} onChange={e=>setProgress(e.target.value)} style={{width:110}}/>
          <button className="btn" onClick={save}>Save</button>
          {message && <span className="badge">{message}</span>}
        </div>
      </div>
    </div>
  );
}
