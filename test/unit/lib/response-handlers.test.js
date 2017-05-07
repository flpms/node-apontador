'use strict';

process.env.NODE_ENV = 'test'

const chai = require('chai');
const sinon = require('sinon');
const EventEmitter = require('events').EventEmitter;

const handler = require('../../../lib/response-handlers.js');

const expect = chai.expect;
const res = new EventEmitter();

const responseHandlers = handler.responseHandlers;
const dataHandlers = handler.dataHandlers;

describe('Expect handler with events when delivery response with correct status', function() {

    it('expect call callback after `data` event is emitted', function() {

        var data = {
            callback: function() {}
        };

        var spy = sinon.spy(data, 'callback');
        var expectArgs = '{ "code": 200, "results" : []}';

        dataHandlers(data, res);

        res.emit('data', expectArgs);
        res.emit('end');

        expect(spy.calledOnce).to.be.true;
    });

    it('expect string parsed to json after call `end` and responseHandlers', function() {

        responseHandlers();

    })

})
