export default function FavoriteCities({favorites,getWeather,removeFavorite,}) {
  return (
    <div className=" bg-white/15 backdrop-blur-md rounded-3xl p-6 text-white shadow-xl border border-white/10 hover:shadow-2xl transition-all duration-500">
      <h2 className="text-xl font-bold mb-4"> ⭐Favorite Cities</h2>

      <div className="flex flex-wrap gap-3">
        {favorites.map((city, index) => (
          <div key={index} className=" flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full px-4 py-2 transition-all duration-300 hover:scale-105">
            <button onClick={() => getWeather(city)} className="font-medium">
              🌤️ {city}
            </button>

            <button
              onClick={() => removeFavorite(city)}
              className=" w-6 h-6 flex items-center justify-center rounded-full bg-red-500/80 hover:bg-red-600 text-sm"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
