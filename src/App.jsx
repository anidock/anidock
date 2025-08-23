import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import AnimeGrid from "./components/AnimeGrid.jsx";

export default function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <Hero />
      <AnimeGrid />
    </div>
  );
}