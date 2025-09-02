import { createClient } from "redis";
import "dotenv/config()";

export const redisClient = await createClient({
  url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`,
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();