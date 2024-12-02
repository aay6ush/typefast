import { REDIS_URL } from "@/constants";
import Redis from "ioredis";

const redis = new Redis(REDIS_URL);

export default redis;
