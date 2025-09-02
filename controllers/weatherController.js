import axios from "axios";
import redisClient from "../config/redisClient.js";

export const getWeather = async (req, res) => {
  const city = req.params.city?.toLowerCase();

  if (!city) {
    return res.status(400).json({ message: "Invalid city name" });
  }

  try {
    // 1. Check Redis cache
    const cachedData = await redisClient.get(city);
    if (cachedData) {
      return res.status(200).json({
        source: "cache",
        data: JSON.parse(cachedData),
      });
    }

    // 2. Fetch from API
    const apiKey = process.env.WEATHER_API_KEY;
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&include=days&key=${apiKey}&contentType=json`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    // 3. Save to Redis cache (1 hour expiry)
    await redisClient.set(city, JSON.stringify(weatherData), { EX: 3600 });

    // 4. Send response
    return res.status(200).json({
      source: "api",
      data: weatherData,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return res.status(500).json({ message: "Failed to fetch weather data" });
  }
};