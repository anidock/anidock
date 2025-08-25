import React, { useEffect, useState } from "react";
import { fetchRatings } from "../lib/reviews_db";

// Simple SVG bar chart for top N anime ratings
export default function RatingsChart({ animeIds = [] }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchRatings(animeIds).then(d => setData(d)).catch(console.error);
  }, [animeIds]);

  if (data.length === 0) return <p>No ratings yet.</p>;

  const max = Math.max(...data.map(d=>d.avg_rating || 0));
  const width = 600, height = 200, padding = 40;
  const barWidth = (width - padding*2) / data.length;

  return (
    <svg width={width} height={height} style={{background:"#0b0d10",display:"block"}}>
      {data.map((d,i)=>{
        const h = ((d.avg_rating||0)/max) * (height - padding*2 || 1);
        return (
          <g key={d.anime_id} transform={`translate(${padding + i*barWidth},${height - padding - h})`}>
            <rect width={barWidth*0.7} height={h} fill="#4f8cff" rx="4" />
            <text x={0} y={h + 14} fontSize="10" fill="#9aa3b2">{d.anime_id}</text>
            <text x={0} y={h + 28} fontSize="10" fill="#9aa3b2">{(d.avg_rating||0).toFixed(1)}</text>
          </g>
        );
      })}
    </svg>
  );
}

