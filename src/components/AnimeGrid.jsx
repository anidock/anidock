import AnimeCard from './AnimeCard'
export default function AnimeGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map((item) => <AnimeCard key={item.mal_id} anime={item} />)}
    </div>
  )
}
