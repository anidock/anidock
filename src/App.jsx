import { Link } from "react-router-dom";

function App() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Welcome to Anidock!</h1>
      <Link
        to="/anime"
        className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go to Anime List
      </Link>
    </div>
  );
}

export default App;
