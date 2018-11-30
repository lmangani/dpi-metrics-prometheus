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

### Example Output
```# HELP dpi_gauge DPI Protocol Detections
# TYPE dpi_gauge gauge
dpi_gauge{L7="Unknown"} 9
dpi_gauge{L7="SIP"} 4
dpi_gauge{L7="SSH"} 18

```
