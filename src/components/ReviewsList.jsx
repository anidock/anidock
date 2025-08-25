import React, { useEffect, useState } from "react";
import { fetchReviews } from "../lib/reviews_db";
import { supabase } from "../lib/supabaseClient";

export default function ReviewsList({ animeId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchReviews(animeId).then(data => { if(mounted) setReviews(data); }).catch(console.error).finally(()=>{ if(mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [animeId]);

  if (loading) return <p>Loading reviews…</p>;
  if (reviews.length === 0) return <p>No reviews yet — be the first to review!</p>;

  return (
    <div>
      {reviews.map(r => (
        <div key={r.id} className="panel" style={{marginBottom:8}}>
          <div style={{fontSize:13,color:"#9aa3b2"}}>{new Date(r.created_at).toLocaleString()}</div>
          <div style={{fontWeight:700}}>{r.rating ? `★ ${r.rating}/10` : "No rating"}</div>
          <div style={{marginTop:6}}>{r.review_text}</div>
        </div>
      ))}
    </div>
  );
}

