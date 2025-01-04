import Redis from "ioredis";

const URL = process.env.REDIS_URL || "redis://localhost:6379";

const redis = new Redis(URL);

export default redis;
