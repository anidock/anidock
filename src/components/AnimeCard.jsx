export default function AnimeCard({ title, img }) {
  return (
    <div className="bg-gray-800 rounded overflow-hidden shadow-lg m-2 w-48">
      <img src={img} alt={title} className="w-full h-64 object-cover" />
      <div className="p-2">
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
    </div>
  );
}