'use strict';

const responseHandlers = require('response-handlers.js');

function makeCall(data) {

    var options = {
        hostname: 'api.apontador.com.br',
        path: `/v2/${data.resource}?${data.params}\&wt=json\&access_token=${data.token}`,
        method: 'GET',
        headers : { "Content-Type" : "application/json" }
    };

    var req = https.request(options, function (res) {
        responseHandlers(data, res);
    });

    req.end();

    req.on('error', function(err) {
        data.callback(err);
    });
};

module.exports = makeCall;
