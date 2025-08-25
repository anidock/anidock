import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function FriendsActivity({ userId }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // For demo: fetch latest reviews by others as 'activity'
    supabase.from("reviews").select("id,user_id,anime_id,review_text,created_at").order("created_at",{ascending:false}).limit(20)
      .then(({ data }) => setActivities(data || []))
      .catch(console.error);
  }, []);

  if (activities.length === 0) return <p>No recent activity.</p>;

  return (
    <div>
      {activities.map(a => (
        <div key={a.id} className="panel" style={{marginBottom:8}}>
          <div style={{fontSize:13,color:"#9aa3b2"}}>{new Date(a.created_at).toLocaleString()}</div>
          <div><strong>{a.user_id}</strong> reviewed anime #{a.anime_id}</div>
          <div style={{marginTop:6}}>{a.review_text}</div>
        </div>
      ))}
    </div>
  );
}

