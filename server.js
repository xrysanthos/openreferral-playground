/*
 * Server module
 */
var nconf = require('nconf');
var path = require('path');

var Bootstrap = require('./services/bootstrap');

/*
 * Load configuration environment
 */
nconf.argv().env('_').file(path.resolve(__dirname, 'config.json'));

/**
 * Setup the system
 */
Bootstrap.setup(function () {});
