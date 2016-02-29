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
            assert.equal(typeof sucess.results.header, 'object');
            assert.equal(typeof sucess.results.header.rows, 'number');
            assert.equal(sucess.results.header.rows, 10);

            done();
        });
    });

    it('search for a place', function(done) {

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
            assert.equal(typeof sucess.results, 'object');
            assert.equal(sucess.results.places[0].id, 'C408483939344N344B');

            done();
        });
    });

    it('search for a addresses', function(done) {

        this.timeout(10000);

        var apt = Apontador.createClient({
            clientSecret: 'nId4d7RfOyTWxSeZoIkTFskw0xT~',
            clientId: 'test_node_apontador'
        });

        apt.addresses({ q : 'Av. Paulista' }, function(err, sucess) {

            if (err) {
                throw err;
            }

            assert.equal(typeof sucess, 'object');
            assert.equal(typeof sucess.addressResults.header, 'object');
            assert.equal(typeof sucess.addressResults.header.rows, 'number');
            assert.equal(sucess.addressResults.header.rows, 10);

            done();
        });
    });

    it('search for a placeById', function(done) {

        this.timeout(10000);

        var dn = done;

        var apt = Apontador.createClient({
            clientSecret: 'nId4d7RfOyTWxSeZoIkTFskw0xT~',
            clientId: 'test_node_apontador'
        });

        apt.getPlaceById('C408483939344N344B', {}, function(err, sucess) {

            if (err) {
                throw err;
            }

            assert.equal(typeof sucess, 'object');
            assert.equal(Array.isArray(sucess), false);
            assert.equal(sucess.place.id, 'C408483939344N344B');

            done();
        });
    });


    it('search for a place by zipcode', function(done) {

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
            assert.equal(sucess.results.places[0].address.state, 'SP');
            assert.equal(sucess.results.places[0].address.zipcode, '09090780');
            done();
        });
    });

    it('get reviews', function(done) {
        this.timeout(10000);


        var apt = Apontador.createClient({
            clientSecret: 'nId4d7RfOyTWxSeZoIkTFskw0xT~',
            clientId: 'test_node_apontador'
        });

        apt.getPlaceReview('JJ4Y8A2F', {rows: 50},function(err, sucess) {

            if (err) {
                console.log(' - - - ', err);
            }

            assert.equal(typeof sucess, 'object');
            assert.equal(typeof sucess.reviewResults, 'object');
            assert.equal(typeof sucess.reviewResults.reviews[0], 'object');
            assert.equal(sucess.reviewResults.header.rows, 50);
            assert.equal(sucess.reviewResults.reviews[0].id, '1302900');

            done();
        });
    })
});
