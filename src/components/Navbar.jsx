import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-zinc-800 p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">AniDock</Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/watchlist">Watchlist</Link>
      </div>
    </nav>
  );
}
