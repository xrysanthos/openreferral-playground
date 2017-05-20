/**
 * Validators endpoint.
 *
 * @author Chris Spiliotopoulos
 */

const _ = require('lodash');
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


};
