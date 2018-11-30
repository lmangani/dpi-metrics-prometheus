<img src="https://i.imgur.com/jrQX0Of.gif" width=250>

# DPI-metrics
Sample NodeJS application exposing [Peafowl DPI](http://github.com/libpeafowl) detections as Prometheus metrics endpoint

## Configuration
Edit the details in `config.js` to configure the parameters
```json
{
	"port": 3000,
	"host": "0.0.0.0",
	"endpoint": "/metrics",
	"interface":"eth0",
	"bpf":""
};
```

### Example Output
```
# HELP dpi_gauge DPI Protocol Detections
# TYPE dpi_gauge gauge
dpi_gauge{L7="Unknown"} 9
dpi_gauge{L7="SIP"} 4
dpi_gauge{L7="SSH"} 18

```
