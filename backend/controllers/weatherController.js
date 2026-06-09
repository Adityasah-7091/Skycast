const getWeather = async (req, res) => {
    try {
        const city = req.params.city;
        const API_KEY = process.env.WEATHER_API_KEY;
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5`
        );
        const data = await response.json();
        if (data.error) {
            return res.status(404).json({
                message: data.error.message
            });
        }
        
        res.json(data);
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {getWeather};