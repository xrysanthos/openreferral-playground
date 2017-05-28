/*
 * Server module
 */
const nconf = require('nconf');
const path = require('path');

const Bootstrap = require('./services/bootstrap');

/*
 * Load configuration environment
 */
nconf.argv().env('_').file(path.resolve(__dirname, 'config.json'));

/**
 * Setup the system
 */
Bootstrap.setup(() => {});
