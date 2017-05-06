var https = require('https');
var querystring = require('querystring');
var OAuth = require('oauth');

var makeCall = require('request-handlers.js');

var aptData = {
    protocol : 'https://',
    host : 'api.apontador.com.br',
    basePath: '/v2/'
};

function Apontador(oauthParams) {
    var OAuth2 = OAuth.OAuth2;

    this.oauthSecret = oauthParams.clientSecret;
    this.oauthClientId = oauthParams.clientId;

    this.oauth2 = new OAuth2(this.oauthClientId, this.oauthSecret,
                                aptData.protocol + aptData.host + aptData.basePath,
                                null, 'oauth/token', null);

    return this;
};

Apontador.prototype._get = function(resource, params, callback){

    var data = {
        resource: resource,
        params: querystring.stringify(params),
        callback: callback,
        token: ''
    };

    this.oauth2.getOAuthAccessToken('' , { 'grant_type' : 'client_credentials' },
        function (e, access_token, refresh_token, results) {

            //User have deal with errors from API
            if (e) {
                return data.callback(e);
            }

            data.token = access_token;
            //Allways pass data obj to callback this make code a testable code, I'm open to sugestions.
            makeCall(data);
        }
    );
};

Apontador.prototype.search = function(params, callback) {
    this._get('search', params, callback);
};

Apontador.prototype.addresses = function(params, callback) {
    this._get('addresses', params, callback);
};

Apontador.prototype.getPlacesByZipcode = function(zipcode, callback) {
    this._get('search/zipcodes', { uri: zipcode }, callback);
};

Apontador.prototype.getPlaceById = function(id, params, callback) {
    this._get('places/' + id, params, callback);
};

Apontador.prototype.getPlaceReview = function(id, params, callback) {
    this._get('places/' + id + '/reviews', params, callback);
}

Apontador.prototype.getPlacePhotos = function(id, params, callback) {
    this._get('places/' + id + '/photos', params, callback);
}

module.exports = {
    createClient: function(oAuthConfig) {
        return new Apontador(oAuthConfig);
    }
};
