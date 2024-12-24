import Redis from "ioredis";

const URL = process.env.REDIS_URL || "redis://localhost:6379";

export class RedisManager {
  private publisher: Redis;
  public subscriber: Redis;

  constructor() {
    this.publisher = new Redis(URL);
    this.subscriber = new Redis(URL);
  }

  async subscribe(channel: string) {
    try {
      await this.subscriber.subscribe(channel);
    } catch (error) {
      console.error(`Error subscribing to channel ${channel}:`, error);
    }
  }

  async unsubscribe(channel: string) {
    try {
      await this.subscriber.unsubscribe(channel);
    } catch (error) {
      console.error(`Error unsubscribing from channel ${channel}:`, error);
    }
  }

  publish(channel: string, message: any) {
    try {
      this.publisher.publish(channel, JSON.stringify(message));
    } catch (error) {
      console.error(`Error publishing to channel ${channel}:`, error);
    }
  }

  cleanup() {
    this.publisher.disconnect();
    this.subscriber.disconnect();
  }
}
