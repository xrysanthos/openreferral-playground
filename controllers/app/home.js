/**
 * Health endpoint.
 *
 * @author Chris Spiliotopoulos
 */


const path = require('path');

/*
 * Home controller
 */
module.exports = function(server) {

  /**
   * Pre-responce interceptor.
   * @param  {[type]} request [description]
   * @param  {[type]} reply   [description]
   * @return {[type]}         [description]
   */
  server.ext('onPreResponse', (request, reply) => {
    const req = request.response;

    // if resource is not found,
    // redirect to home page
    if (req.isBoom && (req.output.statusCode === 404)) {
      return reply.redirect('/');
    }

    return reply.continue();
  });


  /**
   * GET /
   *
   * Returns the home page.
   */
  server.route({
    path: '/',
    method: 'GET',
    config: {
      tags: ['app'],
      description: 'Returns the home page',
      handler(request, reply) {
        // Render the view with the custom greeting
        const data = {
          title: 'This is Index!',
          message: 'Hello, World. You crazy handlebars layout'
        };

        return reply.view('index', data);
      }
    }
  });


  /**
   * Static directory
   * @type {String}
   */
  server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, '../../static')
      }
    }
  });


};
