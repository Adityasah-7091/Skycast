import { Wind, Droplets } from "lucide-react";
export default function CurrentWeather({
  weather,
  addFavorite,
  removeFavorite,
  favorites,
}) {
  const isFavorite = favorites.includes(weather.location.name);
  return (
    <div
      className="relative fade-in bg-white/15 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg
                    hover:scale-105 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{weather.location.name}</h2>

          <p className="text-white/80">
            {weather.location.region}, {weather.location.country}
          </p>
        </div>

      </div>

      <h1 className="text-6xl font-bold mt-4">
        {weather.current.temp_c}°<span className="text-5xl">C</span>
      </h1>

      <p className="text-xl mt-2">{weather.current.condition.text}</p>

      <button
        onClick={() => {
          if (isFavorite) {
            removeFavorite(weather.location.name);
          } else {
            addFavorite(weather.location.name);
          }
        }}
        className="absolute top-5 right-5 text-3xl transition-all duration-300"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white/10 p-3 rounded-xl">
          💧 Humidity
          <p className="font-bold">{weather.current.humidity}%</p>
        </div>

        <div className="bg-white/10 p-3 rounded-xl">
          💨 Wind
          <p className="font-bold">{weather.current.wind_kph} km/h</p>
        </div>

        <div className="bg-white/10 p-3 rounded-xl">
          🌡 Feels Like
          <p className="font-bold">{weather.current.feelslike_c}°C</p>
        </div>

        <div className="bg-white/10 p-3 rounded-xl">
          ☀ UV Index
          <p className="font-bold">{weather.current.uv}</p>
        </div>
      </div>
    </div>
  );
}
