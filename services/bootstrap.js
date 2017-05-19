/**
 * Bootstrap service.
 *
 * @author @spilio
 */


const path = require('path');
const log = require('winston');
const async = require('async');
const nconf = require('nconf');
const Hapi = require('hapi');
const recursive = require('recursive-readdir');
const Inert = require('inert');
const Vision = require('vision');
const hapiSwaggered = require('hapi-swaggered');
const hapiSwaggeredUi = require('hapi-swaggered-ui');


module.exports = (function() {

  // is the environment initialized?
  let _initialized = false;

  // the server instance
  let _server = null;

  /**
   * Sets up the logging context
   */
  function _setupLogging(cb) {
    if (typeof nconf.get().logging === 'undefined') {
      return cb();
    }

    /*
     * setup logging framework
     */
    log.info('Initializing logging framework');

    // Console transport
    if (typeof nconf.get().logging.console !== 'undefined') {
      log.remove(log.transports.Console);

      log.add(log.transports.Console, {
        level: nconf.get().logging.console.level,
        colorize: true
      });

      log.info('\tAdded Console transport');
    }

    if (cb) {
      cb();
    }
  }

  /**
   * Sets up the server
   */
  function _setupServer(cb) {
    try {

      log.info('Setting up server');

      /*
       * Hapi server instance
       */
      _server = new Hapi.Server();

      /*
       * set the connection
       */
      _server.connection({
        host: nconf.get().server.host,
        port: nconf.get().server.port,
        labels: ['api'],
        routes: {
          cors: false,

          files: {
            relativeTo: path.join(__dirname, '../static')
          }
        }
      });

      async.waterfall([

        function(cb) {
          // setup plugins
          _server.register([
            Inert,
            Vision
          ], () => {

            // views configuration
            _server.views({
              engines: {
                html: require('handlebars')
              },
              relativeTo: `${__dirname}/..`,
              path: 'views',
              layoutPath: 'views/layout',
              partialsPath: 'views/partials',
              layout: 'sidebar'
            });

            cb();
          });
        },

        function(cb) {

          // start the server
          _server.start(cb);
        }

      ], (err) => {

        cb(err);
      });

    } catch (e) {
      console.error(`Error setting up server: ${e}`);
    }
  }

  /**
   * Sets up the Swagger plugins
   */
  function _setupSwaggerPlugins(cb) {
    try {

      /*
       * Swagger plugin options
       */
      log.info('Registering Swagger plugins');

      let opts = {
        host: `${nconf.get().server.host}:${nconf.get().server.port}`,
        schemes: ['http', 'https'],
        cors: false,
        info: {
          title: 'Open Referral Playground',
          description: 'Playground app and reference implementation ' +
            'of the Open Referral specification.',
          version: '0.0.1',
          contact: {
            name: 'Chris Spilio (@spilio)',
            url: 'https://github.com/spilio',
            email: 'chrysanthos.spiliotopoulos@gmail.com'
          }
        }
      };

      async.waterfall([

        function(cb) {
          _server.register({
            register: hapiSwaggered,
            options: opts
          }, {
            select: 'api',
            routes: {

            }
          }, (err) => {
            cb(err);
          });

        },

        function(cb) {
          /*
           * Hapi Swaggered UI plugin
           */
          opts = {};

          _server.register({
            register: hapiSwaggeredUi,
            options: opts
          }, {
            select: 'api',
            routes: {
              prefix: '/docs'
            }
          }, (err) => {
            cb(err);
          });
        }

      ], (err) => {

        // done
        cb(err);
      });

    } catch (e) {
      console.error(`Error setting up server plugins: ${e}`);
    }
  }

  /**
   * Sets up the server plugins
   */
  function _setupRouting(cb) {
    try {

      /*
       * load controller routes
       */
      log.info('Registering controller routes');
      const normalizedPath = path.resolve(__dirname, '../controllers');

      // load all controller modules recursively
      recursive(normalizedPath, (err, files) => {
        files.forEach((file) => {
          require(file)(_server);
          log.debug(`\tRegistered ${file}`);
        });

        // done
        cb();
      });

    } catch (e) {
      console.error(`Error setting up routes: ${e}`);
      cb(e);
    }
  }


  return {

    /**
     * Public
     */

    setup(cb) {
      if (_initialized) {
        return;
      }

      log.info('Setting up system');

      async.waterfall([

        function(cb) {
          // setup logging
          _setupLogging(cb);
        },

        function(cb) {
          // setup server
          _setupServer(cb);
        },

        function(cb) {

          // setup the Swagger plugins
          _setupSwaggerPlugins(cb);
        },

        function(cb) {
          // setup routing
          _setupRouting(cb);
        },

        function(cb) {
          // start the server
          _server.start(cb);
        }

      ], (err) => {

        if (err) {
          console.error(err);
          return process.exit(1);
        }

        log.info('Server running at:', _server.info.uri);
        _initialized = true;

        // done
        cb();
      });


    }

  };

}());
