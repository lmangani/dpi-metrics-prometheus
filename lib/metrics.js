// Metrics
var config = require('../config').config;
var metrics = {};

const client = require('prom-client');
const register = client.register;

/*
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
*/
const Gauge = client.Gauge;
metrics.g = new Gauge({
        name: 'dpi_gauge',
        help: 'DPI Protocol Detections',
        labelNames: ['L7']
});

// Server
const fastify = require('fastify')()
fastify.get(config.endpoint, async (request, reply) => {
        reply.send(register.metrics());
	metrics.g.reset();
});

metrics.start = function() {
	console.log('Starting '+config.endpoint+' on', config.host, 'port',config.port)
        const startServer = async () => {
          try {
            await fastify.listen(config.port,config.host)
          } catch (err) {
            console.log(err)
	    process.exit();
          }
        }
        startServer()
}

module.exports.metrics = metrics;

