// Metrics
var config = require('./config').config;
var metrics = {};

const client = require('prom-client');
const register = client.register;

const Histogram = client.Histogram;
metrics.h = new Histogram({
        name: 'test_histogram',
        help: 'Example of a histogram',
        labelNames: ['code']
});

const Counter = client.Counter;
metrics.c = new Counter({
        name: 'test_counter',
        help: 'Example of a counter',
        labelNames: ['code']
});

const Gauge = client.Gauge;
metrics.g = new Gauge({
        name: 'test_gauge',
        help: 'Example of a gauge',
        labelNames: ['method', 'code']
});

// Server
const fastify = require('fastify')()
fastify.get(config.endpoint, async (request, reply) => {
        reply.send(register.metrics());
});

metrics.start = function(port,interface,endpoint) {
	if (!port) port = 3000;
	console.log('Starting '+config.endpoint+' on port',port)
        const startServer = async (port,interface) => {
          try {
            await fastify.listen(port,interface)
            console.log('server listening on',port)
          } catch (err) {
            fastify.log.error(err)
          }
        }
        startServer(config.port,config.interface,config.endpoint)
}

module.exports.metrics = metrics;

