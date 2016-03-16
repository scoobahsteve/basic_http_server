var url = require('url');

function start(req, res) {
  console.log('in start handler');
  var contentVar = 'Hi. This is the index page. Try going to the /time or /greet pages.';
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(contentVar);
  res.end();
  return contentVar;
}

function time(req, res) {
  console.log('in time handler');
  var myTime = new Date();
  console.log(myTime);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(myTime.toString());
  res.end();
  return myTime.toString();
}

function greet (req, res) {
  console.log('in greet handler');
  console.log('the method is : ' + req.method);

  if (req.method === 'GET') {
    var pathname = url.parse(req.url).pathname;
    var greetStart = /\/greet\// ;
    var nStr = greetStart.exec(pathname);
    var nameStr = pathname.slice(nStr['index'] + 7);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello ' + nameStr);
    res.end();
    return nameStr;
  }

  if (req.method === 'POST') {
    req.on('data', function(chunk) {
      var parserObj = JSON.parse(chunk.toString());
      var retStr = 'Hello ' + parserObj['name'];
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(retStr);
      res.end();
      return retStr;
    });
  }
}

exports.start = start;
exports.time = time;
exports.greet = greet;
