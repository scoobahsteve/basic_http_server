var http = require('http');
var url = require('url');

var start = exports.start = function(route, handle) {
  function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname;
    var greetRegex = /\/greet/ ;
    if(greetRegex.test(pathname)) {
      pathname = '/greet'
    }
    console.log('Request for ' + pathname + ' recieved.');

    var contentVar = route(handle, pathname, req, res);
  }

  var servHandle = http.createServer(onRequest).listen(3030);
  console.log('Server has started on port 3030.');

  var stopper = function() {
    servHandle.close();
    console.log('Server stopped.')
  };

  var stop = exports.stop = stopper.bind(start);
};
