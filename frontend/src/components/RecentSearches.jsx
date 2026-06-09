export default function RecentSearches({ history, getWeather }) {
  return (
    <div
      className="bg-white/15 backdrop-blur-md rounded-2xl p-5 text-white
                    hover:scale-105 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
        🕒Recent Searches
      </h2>

      <div className="space-y-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => getWeather(item)} 
            className="block w-full text-left bg-white/10 rounded-lg p-2">
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
