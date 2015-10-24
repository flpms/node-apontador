var https = require('https');
var querystring = require('querystring');     
var OAuth = require('oauth');
var aptData = {
    protocol : 'https://',
    host : 'api.apontador.com.br',
    basePath: '/v2/'
}

var Apontador = function(oauthParams) {
    var OAuth2 = OAuth.OAuth2;

    var self = this;

    this.oauthSecret = oauthParams.clientSecret;
    this.oauthClientId = oauthParams.clientId;

    this.oauth2 = new OAuth2(this.oauthClientId, this.oauthSecret,
                                aptData.protocol + aptData.host + aptData.basePath,
                                null,'oauth/token', null);

    return this;
}

Apontador.prototype._get = function(resource, params, callback){
    
    var data = {
        resource: resource,
        params: querystring.stringify(params),
        callback: callback,
        token: ''
    };

    var _getResource = function() {

        var options = {
            hostname: aptData.host,
            path: aptData.basePath + data.resource + '?' + data.params + '\&access_token=' +data.token,
            method: 'GET',
            headers : {
                "Content-Type" : "application/json"
            }
        }

        var req = https.request(options, function(res) {

            var bf;

            res.on('data', function(dt) {

                bf = new Buffer(dt);
            });
            //This ensure only complete data.
            res.on('end', function() {

                data.callback(null, JSON.parse(bf.toString('utf-8')));
            });
        })

        req.end();

        req.on('error', function(err) {
            data.callback(err);
        });
    };

    this.oauth2.getOAuthAccessToken('' , { 'grant_type' : 'client_credentials' },
        function (e, access_token, refresh_token, results) {

            //User have deal with errors from API
            if (e) {
                data.callback(e);
                return;
            }

            data.token = access_token;
            //Allways pass data obj to callback this make code a testable code, I'm open to sugestions.
            _getResource();
        }    
    );
}

Apontador.prototype.search = function(params, callback) {
    return this._get('search');
}

module.exports = {
    createClient: function(oAuthConfig) {
        return new Apontador(oAuthConfig);
    }
}