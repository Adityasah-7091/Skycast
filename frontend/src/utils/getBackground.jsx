import WeatherBackground from "../components/WeatherBackground";
import sunny from "../assets/backgrounds/sunny.jpg";
import cloud from "../assets/backgrounds/cloud.jpg";
import rain from "../assets/backgrounds/rain.jpeg";
import snow from "../assets/backgrounds/snow.jpeg";
import mist from "../assets/backgrounds/mist.jpeg";
import night from "../assets/backgrounds/night.jpeg";
import thund from "../assets/backgrounds/thund.jpeg";

export default function getBackground(weather) {
  if (!weather) return null;

  const condition = weather.current.condition.text.toLowerCase();

  const isNight = weather.current.is_day === 0;

  if (isNight) {
    return <WeatherBackground image={night} />;
  }

  if (condition.includes("thunder")) {
    return <WeatherBackground image={thund} />;
  }

  if (condition.includes("rain") || condition.includes("drizzle")) {
    return <WeatherBackground image={rain} />;
  }

  if (
    condition.includes("snow") ||
    condition.includes("blizzard") ||
    condition.includes("ice") ||
    condition.includes("sleet")
  ) {
    return <WeatherBackground image={snow} />;
  }

  if (condition.includes("fog") || condition.includes("mist")) {
    return <WeatherBackground image={mist} />;
  }

  if (condition.includes("cloud") || condition.includes("overcast")) {
    return <WeatherBackground image={cloud} />;
  }

  return <WeatherBackground image={sunny} />;
}
