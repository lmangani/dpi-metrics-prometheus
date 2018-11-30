/* PCAP Helper */
var pcap = require('pcap');
var peafowl = require('node-peafowl');
var metrics = require('./metrics').metrics;
var debug = false;

/* PCAP Header  */
const sharedStructs = require('shared-structs');
const structs = sharedStructs(`
      struct pcap {
                  uint64_t ts_sec;
                  uint64_t ts_usec;
                  uint64_t incl_len;
                  uint64_t orig_len;
      }
`);

var commands = {};

commands.start = function(interface,filter){
    peafowl.init();
    var LinkType = 1;
    var pcap_session = pcap.createSession(interface, filter);
        pcap_session.on('packet', function (raw_packet,offset) {
            var packet = pcap.decode.packet(raw_packet);
            LinkType = packet.link_type;
            switch (LinkType) {
            case "LINKTYPE_ETHERNET":
                LinkType = 1;
                break;
            case "LINKTYPE_NULL":
                LinkType = 0;
                 break;
            case "LINKTYPE_RAW":
                LinkType = 101;
                break;
            case "LINKTYPE_IEEE802_11_RADIO":
                LinkType = 127;
                break;
            case "LINKTYPE_LINUX_SLL":
                LinkType = 113;
            default:
                console.log("Datalink type not supported");
            }

	   var header = raw_packet.header;
	    // Build PCAP Hdr Struct
	    var newHdr = structs.pcap();
	    newHdr.ts_sec = packet.pcap_header.tv_sec;
	    newHdr.ts_usec = packet.pcap_header.tv_usec;
	    newHdr.incl_len = packet.pcap_header.caplen;
	    newHdr.orig_len = packet.pcap_header.len;

	   var protoL7 = new Buffer.from(peafowl.get_L7_from_L2( raw_packet.buf, newHdr.rawBuffer, LinkType ));

	    // From object to String
	    protoL7 = protoL7.toString();
	    if (debug) console.log("L7: ", protoL7);
	    if (protoL7 != "Unknown" && metrics){
	        // metrics.g.set({ method: protoL7, code: 200 }, 1);
	        metrics.h.labels(protoL7).observe(1);
	    }

        });

}

module.exports.pcap = commands;
