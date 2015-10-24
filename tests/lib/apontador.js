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

        this.timeout(10000);

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

    it('search for a place', function() {

        this.timeout(10000);

        var apt = Apontador.createClient({
            clientSecret: 'nId4d7RfOyTWxSeZoIkTFskw0xT~',
            clientId: 'test_node_apontador' 
        });

        apt.search({ q : 'mazza restaurante', fq : 'address.city:"santo andre"' }, function(err, sucess) {

            if (err) {
                throw err;
            }

            assert.equal(typeof sucess, 'object');
            assert.equal(sucess.result.places[0].id, 'C408483939344N344B');

            done();
        });
    });

    it('search for a addresses', function() {

        this.timeout(10000);

        var apt = Apontador.createClient({
            clientSecret: 'nId4d7RfOyTWxSeZoIkTFskw0xT~',
            clientId: 'test_node_apontador' 
        });

        apt.addresses({ q : 'Av. Paulista', fq : 'address.city:"Sao Paulo"' }, function(err, sucess) {

            if (err) {
                throw err;
            }

            assert.equal(typeof sucess, 'object');

            done();
        });
    });

    it('search for a placeById', function() {

        this.timeout(10000);

        var apt = Apontador.createClient({
            clientSecret: 'nId4d7RfOyTWxSeZoIkTFskw0xT~',
            clientId: 'test_node_apontador' 
        });

        apt.getPlaceById('C408483939344N344B', function(err, sucess) {

            if (err) {
                throw err;
            }

            assert.equal(typeof sucess, 'object');

            done();
        });
    });


    it('search for a place by zipcode', function() {

        this.timeout(10000);

        var apt = Apontador.createClient({
            clientSecret: 'nId4d7RfOyTWxSeZoIkTFskw0xT~',
            clientId: 'test_node_apontador' 
        });

        apt.getPlacesByZipcode('09090780', function(err, sucess) {

            if (err) {
                throw err;
            }

            assert.equal(typeof sucess, 'object');
            assert.equal(sucess.result.addresses.state, 'SP');
            assert.equal(sucess.result.addresses.zipcode, '09090780');
            done();
        });
    });
});