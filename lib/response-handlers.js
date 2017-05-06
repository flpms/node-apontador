'use strict';

function responseHandlers(result, callback) {

    if (result.code > 399 || result.errors) {
        return data.callback(result);
    }

    return data.callback(null, result);
}

function dataHandlers(data, res) {
    var body = '';

    res.on('data', function(dt) {
        body += dt;
    });

    res.on('end', function () {
        responseHandlers(JSON.parse(body), res.callback);
    });
}

module.exports = dataHandlers;
