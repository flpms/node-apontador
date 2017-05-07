'use strict';

function responseHandlers(result, callback) {

    var result = JSON.parse(result);

    if (result.code > 399 || result.errors) {
        return callback(result);
    }

    return callback(null, result);
}

function dataHandlers(data, res) {
    var body = '';

    res.on('data', function(dt) {
        body += dt;
    });

    res.on('end', function () {
        responseHandlers(body, data.callback);
    });
}

if (process.env.NODE_ENV !== 'test') {
    module.exports = dataHandlers;
}

module.exports = {
    responseHandlers: responseHandlers,
    dataHandlers: dataHandlers
}
