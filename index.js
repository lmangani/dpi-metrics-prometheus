/*
 * Peafowl DPI Metrics
 *
 *
 */


var config = require('./config').config;
if (!config || !config.port || !config.endpoint) process.exit();

// Initialize Metrics Server
console.log('Initializing Metrics...');
const metrics = require('./lib/metrics').metrics;
metrics.start(config.port,config.host,config.endpoint);

console.log('Initializing Socket...',config.interface,config.bpf);
const pcap = require('./lib/pcap').pcap;
pcap.start(config.interface,config.bpf);

console.log('Running...');
