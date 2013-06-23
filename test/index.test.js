var sinon = require('sinon'),
    expect = require('chai').expect;

var moya = require('../lib/index.js');

describe("moya defaults", function() {
    it("basic auth should be enabled", function() {
        expect(moya.auth.basic).to.equal(true);
    });
    it("nconf should be instantiated", function() {
        var exists = expect(moya.nconf).to.exist;
    });
});