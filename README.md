# DPI-metrics
Sample application exposing [Peafowl DPI](http://github.com/libpeafowl) detections as Prometheus metrics endpoint

## Configuration
Edit the details in `config.js` to configure the parameters
```
var config = {
	"port": 3000,
	"host": "0.0.0.0",
	"endpoint": "/metrics",
	"interface":"eth0",
	"bpf":""
};
```
