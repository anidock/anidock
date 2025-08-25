import React, { useState } from "react";
import { postReview } from "../lib/reviews_db";
import { useAuth } from "../context/AuthContext";

export default function ReviewForm({ animeId, onSaved }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [rating, setRating] = useState(8);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!user) return alert("Please login to post a review.");
    setLoading(true);
    try {
      await postReview(user.id, Number(animeId), rating, text);
      setText(""); setRating(8);
      onSaved && onSaved();
      alert("Review posted");
    } catch (e) {
      alert(e.message || "Error");
    } finally { setLoading(false); }
  };

  return (
    <div className="panel">
      <h4>Write a review</h4>
      <div className="form-row" style={{marginTop:8}}>
        <label>Rating</label>
        <input type="number" min="1" max="10" value={rating} onChange={e=>setRating(e.target.value)} style={{width:90}} />
        <label>Review</label>
        <textarea value={text} onChange={e=>setText(e.target.value)} rows="4" className="card" style={{width:"100%"}} />
      </div>
      <div style={{marginTop:8}}>
        <button className="btn" onClick={save} disabled={loading}>{loading? "Saving...":"Post review"}</button>
      </div>
    </div>
  );
}

