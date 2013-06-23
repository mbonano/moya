var nconf = require('nconf');
var auth = {
    basic: true
};

function createServer(options) {
    var defaultOptions = {
        name: 'moya-application'
    };

    // merge supplied options with default options
    var opt = mergeRecursive(defaultOptions, options);

    var fs = require('fs'),
        util = require('util'),
        restify = require('restify');

    // Favor command-line arguments and environment variables.
    nconf.env().argv();

    if (nconf.get('conf') == null)
        nconf.set('conf', opt.conf);

    // Check for a config file or the default location.
    if (nconf.get('conf') != null && fs.existsSync(nconf.get('conf'))) {
        nconf.file({file: nconf.get('conf')});
    }

    var server = restify.createServer({
        name: opt.name
    });

    server.use(restify.acceptParser(['application/json']));
    server.use(restify.dateParser());
    server.use(restify.authorizationParser());
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    server.use(restify.conditionalRequest());

    server.use(function authenticate(req, res, next) {
        if (req.url == '/') next();

        // only support basic auth for the dev environment
        if (auth.basic) {
            var authRequiredMessage = 'Authentication is required. There are two ways to authenticate: basic authentication and OAuth 2.0 token authentication.';

            if (req.authorization == null)
                return next(new restify.NotAuthorizedError(authRequiredMessage + " - req.authorization is null!" + " - " + util.inspect(req)));

            //TODO: inject the account service to handle authentication
            if (req.username === 'mbonano' && req.authorization.basic.password === 'mypassword')
                return next();

            if (req.authorization.scheme == 'Basic')
                return next(new restify.NotAuthorizedError('Invalid credentials supplied for "' + req.username + '"'));

            return next(new restify.NotAuthorizedError(authRequiredMessage + ' ' + req.authorization.scheme));
        }

        return next();
    });

    return server;
}

/*
 * Recursively merge properties of two objects
 */
function mergeRecursive(obj1, obj2) {

    for (var p in obj2) {
        try {
            // Property in destination object set; update its value.
            if ( obj2[p].constructor==Object ) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);

            } else {
                obj1[p] = obj2[p];

            }

        } catch(e) {
            // Property in destination object not set; create it and set its value.
            obj1[p] = obj2[p];

        }
    }

    return obj1;
}

module.exports = {
    nconf: nconf,
    auth: auth,
    createServer: createServer
};
