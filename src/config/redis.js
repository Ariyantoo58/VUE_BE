const { createClient } = require("redis");

const client = createClient({
	password: "SkDF06FGeAxIJhUB1UZqEjoqZdxIa1Bu",
	socket: {
		host: "redis-18973.c1.ap-southeast-1-1.ec2.redns.redis-cloud.com",
		port: 18973,
	},
});

module.exports = client;
