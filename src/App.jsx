import Navbar from "./components/Navbar";
import AnimeList from "./components/AnimeList";

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Trending Anime</h1>
        <AnimeList />
      </main>
    </div>
  );
}
