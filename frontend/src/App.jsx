import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import ForecastCard from "./components/ForecastCard";
import HourlyForecast from "./components/HourlyForecast";
import Loader from "./components/Loader";
import FavoriteCities from "./components/FavoriteCities";
import RecentSearches from "./components/RecentSearches";
import API from "./services/api";
import toast, { Toaster } from "react-hot-toast";
import getBackground from "./utils/getBackground";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  const background = getBackground(weather);
  const hasWeather = weather !== null;

  async function getCurrentLocationWeather() {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          setLoading(true);

          const res = await API.get(`/weather/${lat},${lon}`);

          setWeather(res.data);

          const cityName = res.data.location.name;

          let updatedHistory =
            JSON.parse(localStorage.getItem("history")) || [];

          updatedHistory = updatedHistory.filter(
            (city) => city.toLowerCase() !== cityName.toLowerCase(),
          );

          updatedHistory.unshift(cityName);
          updatedHistory = updatedHistory.slice(0, 10);

          localStorage.setItem("history", JSON.stringify(updatedHistory));

          setHistory(updatedHistory);
        } catch (err) {
          console.log(err);
          toast.error("Unable to fetch location weather");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.log(error);
        toast.error("Location permission denied");
      },
    );
  }

  function addFavorite(city) {
    if (favorites.includes(city)) {
      toast.error("Already in favorites");
      return;
    }

    const updatedFavorites = [...favorites, city];

    setFavorites(updatedFavorites);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    toast.success("Added to favorites");
  }

  function removeFavorite(city) {
    const updatedFavorites = favorites.filter((item) => item !== city);

    setFavorites(updatedFavorites);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    toast.success("Favorite removed");
  }

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];

    setHistory(savedHistory);
  }, []);

  async function getWeather(cityName = city) {
    try {
      if (!cityName.trim()) {
        toast.error("Please enter a city");
        return;
      }

      setLoading(true);

      const res = await API.get(`/weather/${cityName}`);

      setWeather(res.data);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      const cityNameToStore = res.data.location.name;

      let updatedHistory = JSON.parse(localStorage.getItem("history")) || [];

      updatedHistory = updatedHistory.filter(
        (city) => city.toLowerCase() !== cityNameToStore.toLowerCase(),
      );

      updatedHistory.unshift(cityNameToStore);

      updatedHistory = updatedHistory.slice(0, 10);

      localStorage.setItem("history", JSON.stringify(updatedHistory));

      setHistory(updatedHistory);
    } catch (err) {
      console.log(err);
      toast.error("City not found");
    } finally {
      setLoading(false);
    }
  }

  // INITIAL SCREEN
  if (!hasWeather) {
    return (
      <div className="min-h-screen bg-linear-to-br from-sky-500 via-blue-600 to-indigo-900 p-6">
        <Toaster position="top-right" />

        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold text-white text-center mb-8">
            Weather Dashboard
          </h1>

          <SearchBar
            city={city}
            setCity={setCity}
            getWeather={getWeather}
            loading={loading}
          />

          <div className="flex justify-center mt-4">
            <button
              onClick={getCurrentLocationWeather}
              className="px-5 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
            >
              📍 Use Current Location
            </button>
          </div>

          {loading && <Loader />}

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <FavoriteCities
              favorites={favorites}
              getWeather={getWeather}
              removeFavorite={removeFavorite}
            />

            <RecentSearches history={history} getWeather={getWeather} />
          </div>
        </div>
      </div>
    );
  }

  // WEATHER SCREEN
  return (
    <>
      {background}

      <Toaster position="top-right" />

      <div className="relative z-10 max-w-5xl mx-auto p-6">
        <h1 className="text-5xl font-bold text-white text-center mb-6">
          Skycast
        </h1>

        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={getCurrentLocationWeather}
            className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
          >
            📍 Current Location
          </button>
        </div>

        <SearchBar
          city={city}
          setCity={setCity}
          getWeather={getWeather}
          loading={loading}
        />

        {loading && <Loader />}

        <div className="mt-8">
          <CurrentWeather weather={weather} addFavorite={addFavorite} removeFavorite={removeFavorite} favorites={favorites} />
        </div>

        <HourlyForecast hours={weather.forecast.forecastday[0].hour} />

        <h2 className="text-2xl text-white font-bold mt-8 mb-4">
          📅 5 Day Forecast
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {weather.forecast.forecastday.map((day, index) => (
            <ForecastCard key={day.date} day={day} index={index} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <FavoriteCities
            favorites={favorites}
            getWeather={getWeather}
            removeFavorite={removeFavorite}
          />

          <RecentSearches history={history} getWeather={getWeather} />
        </div>
      </div>
    </>
  );
}

export default App;
