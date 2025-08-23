import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AnimeDetail() {
  const { idSlug } = useParams();
  const id = idSlug.split("-")[0];
  const [anime, setAnime] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
      .then(res => res.json())
      .then(data => setAnime(data.data));
  }, [id]);

  const addToWatchlist = () => {
    let wl = JSON.parse(localStorage.getItem("watchlist") || "[]");
    if (!wl.includes(id)) {
      wl.push(id);
      localStorage.setItem("watchlist", JSON.stringify(wl));
      alert("Added to watchlist!");
    } else {
      alert("Already in watchlist!");
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  if (!anime) return <p className="p-4">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
      <img src={anime.images.jpg.large_image_url} alt={anime.title} className="rounded-xl mb-4" />
      <p className="max-w-2xl text-zinc-300">{anime.synopsis}</p>

      <div className="mt-4 space-x-2">
        <button onClick={addToWatchlist} className="bg-blue-600 px-4 py-2 rounded">Add to Watchlist</button>
        <button className="bg-green-600 px-4 py-2 rounded">Watch Now (Coming Soon)</button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        <form onSubmit={handleComment} className="mb-2">
          <input 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="px-2 py-1 text-black rounded mr-2"
          />
          <button type="submit" className="bg-zinc-700 px-2 py-1 rounded">Post</button>
        </form>
        <ul className="space-y-1">
          {comments.map((c, i) => (
            <li key={i} className="bg-zinc-800 p-2 rounded">{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
