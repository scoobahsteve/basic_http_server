const mocha = require('mocha');
const net = require('net');
const expect = require('chai').expect;
var chai = require('chai')
  , chaiHttp = require('chai-http');
chai.use(chaiHttp);
const fs = require('fs');
const index = require(__dirname + '/../index');

describe('http server pointing at index', () => {
  before(() => {
    index.serverstart();
  });

  after(() => {
    index.serverstop();
  });

  it('should have a reply on index or /', (done) => {
    var app = 'http://localhost:3030';
    chai.request(app)
      .get('/')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
      });
    chai.request(app)
      .get('/index')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('time page route and behavior', () => {
  before(() => {
    index.serverstart();
  });

  after(() => {
    index.serverstop();
  });

  it('should connect on the time route', (done) => {
    var app = 'http://localhost:3030';

    chai.request(app)
      .get('/time')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.be.text;
        expect(res).to.have.body;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('greet page GET', () => {
  before(() => {
    index.serverstart();
  });

  after(() => {
    index.serverstop();
  });

  it('should connect on the greet route', (done) => {
    var app = 'http://localhost:3030';
    chai.request(app)
      .get('/greet/testname')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello testname');
        done();
      });
  });
});

describe('greet page POST', () => {
  before(() => {
    index.serverstart();
  });

  after(() => {
    index.serverstop();
  });

  it('should handle the put and return name', (done) => {
    var app = 'http://localhost:3030';
    chai.request(app)
      .post('/greet')
      .send({'name': 'test'})
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.be.text;
        expect(res.text).to.eql('Hello test');
        done();
      });
  });
});
