# Weather API

A Node.js API that fetches weather data from Visual Crossing API and caches results in Redis for faster responses. This project demonstrates working with third-party APIs, caching, environment variables, and rate limiting.

---

Challenge -https://roadmap.sh/projects/weather-api-wrapper-service

## Features

- Fetch real-time weather data for any city using [Visual Crossing API](https://www.visualcrossing.com/weather-api/)
- Caching with Redis (1-hour expiry by default) to reduce API calls
- Rate limiting using `express-rate-limit` to prevent abuse

---

## Project Structure

```bash
weather-api/
│── config/
│ └── redisClient.js # Redis configuration
│── controllers/
│ └── weatherController.js # Weather fetching & caching logic
│── routes/
│ └── weatherRoutes.js # API routes
│── server.js # Main server file
│── .env # Environment variables
│── package.json
```
---

## Setup & Installation

1. **Clone the repository**

```bash
git clone https://github.com/adarsh-site/weather-api.git
cd weather-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a .env file in the root:

```bash
WEATHER_API_KEY=your_visualcrossing_api_key
REDIS_USERNAME=default
REDIS_PASSWORD=your_redis_password
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
PORT=3000
```

4. **Start the server**

```bash
npm start
```

## API Endpoints

Get Weather by City

```bash
GET /weather/:city
```

Example

```bash
GET http://localhost:3000/weather/Delhi
```

Response

```bash
{
  "source": "api",  // or "cache" if fetched from Redis
  "data": {
    "queryCost": 1,
    "latitude": 51.5072,
    "longitude": -0.1275,
    "resolvedAddress": "london",
    "address": "london",
    "timezone": "Europe/London",
    "tzoffset": 1,
    "days": [
      {
        "datetime": "2025-09-02",
        "datetimeEpoch": 1756767600,
        "tempmax": 65.6,
        "tempmin": 55.7,
        "temp": 60.7,
        "feelslikemax": 65.6,
        "feelslikemin": 55.7,
        "feelslike": 60.7,
        "dew": 54.9,
        "humidity": 81.7,
        "precip": 0.028,
        "precipprob": 64.5,
        "precipcover": 20.83,
        "preciptype": [
          "rain"
        ],
        "snow": 0,
        "snowdepth": 0,
        "windgust": 27.3,
        "windspeed": 9.8,
        "winddir": 189.1,
        "pressure": 1003.2,
        "cloudcover": 83.3,
        "visibility": 11.1,
        "solarradiation": 75.5,
        "solarenergy": 6.5,
        "uvindex": 4,
        "severerisk": 10,
        "sunrise": "06:14:56",
        "sunriseEpoch": 1756790096,
        "sunset": "19:44:23",
        "sunsetEpoch": 1756838663,
        "moonphase": 0.33,
        "conditions": "Rain, Partially cloudy",
        "description": "Partly cloudy throughout the day with afternoon rain.",
        "icon": "rain",
        "stations": [
          "EGWU",
          "EGLL",
          "D5621",
          "EGLC"
        ],
        "source": "comb"
      }
    ]
  }
}
```
