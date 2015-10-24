var assert = require('assert');
var Apontador = require('../../lib/apontador.js');

describe('Apontador', function() {       
    it('get initial object', function() {

            var apt = Apontador.createClient({
                clientSecret: 'nId4d7RfOyTWxSeZoIkTFskw0xT~',
                clientId: 'test_node_apontador' 
            });

            assert.equal(typeof apt, 'object');
    });

    it('get token and data from Apontador', function(done) {

        this.timeout(1000);

        var apt = Apontador.createClient({
            clientSecret: 'nId4d7RfOyTWxSeZoIkTFskw0xT~',
            clientId: 'test_node_apontador' 
        });

        apt._get('search', { q : 'mazza restaurante', fq : 'address.city:"santo andre"' }, function(err, sucess) {

            if (err) {

                throw err;
            }

            assert.equal(typeof sucess, 'object');

            done();
        });
    });
});