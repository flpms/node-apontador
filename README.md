# Node Apontador - [![build status](https://secure.travis-ci.org/flpms/node-apontador.png)](http://travis-ci.org/flpms/node-apontador)

Node.js module for interacting with Apontador API v2.0

## Install

``` Shell
npm install node-apontador --save
```

## Usage

``` Javascript
	var apontador = require('apontador');

	var client = apontador.createClient({
		clientSecret: 'nId4d7RfOyTWxSeZoIkTFskw0xT~',
        clientId: 'test_node_apontador'
	});

	client.search({q:'Place to find'}, function(err, sucess){
		if (err) {
			throw err;
		}

		console.log(sucess);
	});
```
## Usage

* Search

``` Javascript

client.search({ q : 'mazza restaurante', fq : 'address.city:"santo andre"' }, function() {
	if (err) {
		throw err;
	}

	console.log(sucess);
});
```

* Search for addresses

``` Javascript
apt.addresses({ q : 'Av. Paulista', fq : 'address.city:"Sao Paulo"' }, function(err, sucess) {

    if (err) {
        throw err;
    }

    console.log(sucess);
});
```

* Search a place for a ID

``` Javascript

apt.getPlaceById('C408483939344N344B', function(err, sucess) {

    if (err) {
        throw err;
    }

    console.log(sucess);
});

```

* Search for a zipcode

``` Javascript
// Send a brazilian zipcode to get places.
apt.getPlacesByZipcode('09090780', function(err, sucess) {

    if (err) {
        throw err;
    }

    console.log(sucess);
});
```

* Search for a zipcode

``` Javascript
// Send placeID to get reviews
apt.getPlaceReview('C408483939344N344B', function(err, sucess) {

    if (err) {
        throw err;
    }

    console.log(sucess);
});
```

### Informations

You can get more informations about Apontador API [here](https://api.apontador.com.br).
Apontador is a Brazilian local search, and only list at moment places in Brazil.

This software is not provide by [Apontador](http://apontador.com.br) or yours employees.
