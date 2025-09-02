import { createClient } from "redis";
import "dotenv/config";

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || "127.0.0.1"}:${process.env.REDIS_PORT || 6379}`,
});

redisClient.on("error", (err) => console.error("❌ Redis Client Error:", err));

export default redisClient;