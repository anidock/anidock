import React from "react";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800">
      <h1 className="text-2xl font-bold">Anidock</h1>
      <div className="space-x-4">
        <a href="#" className="hover:text-yellow-400">Home</a>
        <a href="#" className="hover:text-yellow-400">Watch</a>
        <a href="#" className="hover:text-yellow-400">Track</a>
        <a href="#" className="hover:text-yellow-400">Community</a>
      </div>
    </nav>
  );
}

export default Navbar;

