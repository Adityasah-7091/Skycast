export default function HourlyForecast({ hours }) {
  return (
    <div className=" fade-in mt-8 hover:scale-105 transition-all duration-300">
      <h2 className="text-2xl text-white font-bold mb-4">⏰Hourly Forecast</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {hours
          .filter((hour) => {
            const now = new Date();
            return new Date(hour.time) >= now;
          })
          .map((hour) => (
            <div key={hour.time} className="min-w-30 bg-white/15 backdrop-blur-md rounded-2xl p-4 text-white text-center">
              <p className="font-semibold">{hour.time.split(" ")[1]}</p>

              <img src={hour.condition.icon} alt="" className="mx-auto" />

              <h3 className="text-xl font-bold">{hour.temp_c}°</h3>

              <p className="text-sm">🌧 {hour.chance_of_rain}%</p>
            </div>
          ))}
      </div>
    </div>
  );
}
