/* PCAP Helper */
var pcap = require('pcap');
var utils = require('./utils');
var peafowl = require('node-peafowl');
var metrics = require('./metrics').metrics;
var config = require('../config').config;

var sniffer = {};

sniffer.start = function(interface,filter){
    peafowl.init();
    var LinkType = 1;
    var pcap_session = pcap.createSession(interface, filter);
        pcap_session.on('packet', function (raw_packet,offset) {
            var packet = pcap.decode.packet(raw_packet);
            LinkType = utils.getLinkType(packet.link_type);
	    // Build PCAP Hdr Struct
	    var newHdr = utils.getHeader(packet);
	    // Identify L7 Protocol
	    var protoL7 = new Buffer.from(peafowl.get_L7_from_L2( raw_packet.buf, newHdr.rawBuffer, LinkType )).toString();
	    // Emit Statistics
	    if (config.debug) console.log("L7: ", protoL7);
	    if (metrics.g) metrics.g.labels(protoL7).inc();
	    if (metrics.s) metrics.s.labels(protoL7).inc(packet.pcap_header.len);
        });
}

module.exports.pcap = sniffer;
