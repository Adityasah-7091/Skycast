export default function WeatherBackground({ image }) {
  return (
    <div className="fixed inset-0 -z-10">
      <img
        src={image}
        alt="weather background"
        className="w-full h-full object-cover"/>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45"></div>
    </div>
  );
}