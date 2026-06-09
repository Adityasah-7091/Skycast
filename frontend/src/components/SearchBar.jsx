export default function SearchBar({ city, setCity, getWeather,loading }) {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            getWeather();
          }
        }}
        className="flex-1 rounded-xl px-4 py-3 bg-white/20 backdrop-blur-md border border-white/20 text-white outline-none"/>
      <button
        onClick={() => getWeather()}
        disabled={loading}
        className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold">
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}
