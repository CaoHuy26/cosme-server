const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_PORT);

redisClient.on('connect', () => {
  console.log('✅ Redis is connected');
});

redisClient.on('error', error => {
  console.log(`❌ Unable to connect to Redis: ${error}`);
});

module.exports = redisClient;