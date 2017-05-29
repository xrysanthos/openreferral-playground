/**
 * Validators endpoint.
 *
 * @author Chris Spiliotopoulos
 */

const _ = require('lodash');
const Joi = require('joi');
const Boom = require('boom');
const Resources = require('../../lib/validators/resources').Resources;

module.exports = function(server) {

  /**
   * GET /api/resources
   *
   * Returns the resource validators view.
   */
  server.route({
    path: '/api/resources',
    method: 'GET',
    config: {
      handler(request, reply) {

        let resources = Resources.getDefinitions();

        resources = _.map(resources, (o) => ({
          name: o.name,
          title: _.capitalize(o.name.split('_').join(' ')),
          description: o.description
        }));

        resources = _.sortBy(resources, 'name');

        return reply(resources);
      }
    }
  });

  /**
   * GET /api/resources
   *
   * Returns the resource validators view.
   */
  server.route({
    path: '/api/resources/{name}',
    method: 'GET',
    config: {
      validate: {
        params: {
          name: Joi.string().required()
            .description('The name of the resource')
        }
      },
      handler(request, reply) {

        const name = request.params.name;

        try {
          // get the selected resource
          // with full meta data
          const resource = Resources.getDefinition(name, true);

          console.log(resource.schema.primaryKey);

          if (_.startsWith(request.headers.accept, 'text/html')) {
            // HTML template
            reply.view('partials/features/validators/resource-definition', resource, {layout: 'partial'});
          } else {
            // JSON
            reply(resource);
          }

        } catch (e) {
          reply(Boom.badRequest(e.message));
        }
      }
    }
  });


};
