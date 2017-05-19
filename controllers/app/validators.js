/**
 * Validators endpoint.
 *
 * @author Chris Spiliotopoulos
 */
'use strict';


/*
 * Home controller
 */
module.exports = function(server) {

  /**
   * GET /validators
   *
   * Returns the validators view.
   */
  server.route({
    path: '/validators',
    method: 'GET',
    config: {
      handler: function(request, reply) {

        return reply.view('features/validators/index');
      }
    }
  });


};
