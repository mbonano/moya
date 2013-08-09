var sinon = require('sinon'),
    expect = require('chai').expect;

var moya = require('../lib/index.js');

describe("moya defaults", function() {
    it("basic auth should be disabled by default", function() {
        expect(moya.options.auth.basic).to.equal(false);
    });
    it("nconf should be instantiated", function() {
        var exists = expect(moya.nconf).to.exist;
    });
});