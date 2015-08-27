var OAuth = require('oauth');

var Apontador = function(oauthParams) {
    var OAuth2 = OAuth.OAuth2

    var self = this;

    this.oauthToken;
    this.oauthSecret = oauthParams.clientSecret;
    this.oauthClientId = oauthParams.clientId;

    this.oauth2 = new OAuth2(this.oauthClientId, this.oauthSecret, 'https://api.apontador.com.br/', 
        null, 'v2/oauth2/token', null);

    return this;
}

Apontador.prototype.get = function(resource, params, callback){
    return this.oauth2.getOAuthAccessToken('', {'grant_type' : 'client_credentials'},
    function (e, access_token, refresh_token, results) {
        this.oauthToken = access_token;
    });
}

Apontador.prototype.search = function() {

}

module.exports = apontador;