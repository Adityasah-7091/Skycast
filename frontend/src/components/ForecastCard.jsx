export default function ForecastCard({ day, index }) {
  return (
    <div
      className="card-appear bg-white/15 backdrop-blur-md rounded-xl p-4 text-white text-center
                    hover:scale-105 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}>
        
      <p className="font-semibold">
        {new Date(day.date).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </p>

      <img src={day.day.condition.icon} alt="" className="mx-auto" />

      <h3 className="text-xl font-bold">
        Max : {day.day.maxtemp_c}°<span className="text-l font-normal">C</span>
      </h3>

      <p>
        Min : {day.day.mintemp_c}°<span className="text-l font-normal">C</span>
      </p>
    </div>
  );
}
