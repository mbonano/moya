# Moya

### A platform built on node.js for developing lean, componential and highly scalable RESTful Hypermedia APIs

## Overview

Moya is comprised of a variety of technologies that, together, address many major development concerns:

* [nconf](https://github.com/flatiron/nconf) - Configuration Management
* [restify](http://mcavage.github.io/node-restify/) - A RESTful API development module

## Examples

Moya was developed to manage the core dependencies required to develop RESTful Hypermedia APIs. Because of this, moya
makes if very easy to immediately begin developing your endpoints. Here's an example:

```javascript
var moya = require('moya');
var nconf = moya.nconf;

var server = moya.createServer({
    name: 'moya-application'
});

server.get('/', function(req, res, next) {
    var entryPointResponse = {
        version : "0.0.0",

        _links : {
            self: { href: "/" },
            patients: { href: "/patients" }
        },

        name : "my api entry point"
    };
    res.send(entryPointResponse);
    return next();
});

server.listen(nconf.get('http:port'), '0.0.0.0', function() {
    console.log('%s listening on %s', server.name, server.url);
});
```

You would run the code above (assuming it was saved in a file called index.js) as follows:

```shell
node index.js
```

Note that the server is initiated to listen on a port that is being read externally:

```javascript
server.listen(nconf.get('http:port'), ...
```

Moya is preconfigured to support external config files. Make a new file called app.conf.json with the following contents:

```json
{
    "http": {
        "port": 8090
    }
}
```

You can now pass your configuration files as command line arguments when starting your node application. This is
customarily an essential step when configuring continuous integration:

```shell
node index.js --conf=app.conf.json
```

You application will now run on port 8090, as specified in the app.conf.json file supplied at the command line