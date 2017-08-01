var PORT_SERV = 33332;
var HOST_SERV = '127.0.0.1';
var PORT_ONE = 33333;
var HOST_ONE = '127.0.0.1';
var PORT_TWO = 33334;
var HOST_TWO = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var client = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log('UDP in ');
    client.send(message, 0, message.length, PORT_ONE, HOST_ONE, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST_ONE +':'+ PORT_ONE);
        client.close();
    });

    client.send(message, 0, message.length, PORT_TWO, HOST_TWO, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST_TWO +':'+ PORT_TWO);
        client.close();
    });
});

server.bind(PORT_SERV, HOST_SERV);
