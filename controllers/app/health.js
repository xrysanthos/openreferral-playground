/**
 * Health endpoint.
 *
 * @author Chris Spiliotopoulos
 */


/*
 * API routes
 */
module.exports = function (server) {

	/**
	 * GET /health
	 *
	 * Returns health status.
	 */
  server.route({
    path: '/health',
    method: 'GET',
    config: {
      description: 'Returns health status',
      handler (request, reply) {
        reply();
      }
    }
  });

};
