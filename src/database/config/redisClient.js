const Redis = require('ioredis');
const redisConfig = require('./redis');

const redisClient = new Redis(redisConfig.url)



module.exports = redisClient;