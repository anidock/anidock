import React from "react";

function AnimeCard({ title, img }) {
  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden hover:scale-105 transition-transform">
      <img src={img} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
    </div>
  );
}

export default AnimeCard;

