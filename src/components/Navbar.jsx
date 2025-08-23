export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800">
      <h1 className="text-2xl font-bold">Anidock</h1>
      <div className="space-x-4">
        <button>Home</button>
        <button>Browse</button>
        <button>My List</button>
        <button>Community</button>
      </div>
    </nav>
  );
}