const chai = require('chai');
const should = chai.should();

const {
  Resources
} = require('../../../lib/validators/resources');

const {
  RESOURCE_TYPES
} = require('../../../lib/validators/constants');

context('Resources class', () => {

  context('get types()', () => {

    it('should return the list of supported resources', () => {

      const types = Resources.types;
      types.should.be.an('array');
      types.should.have.length(22);
    });

  });

  context('getDefinitions()', () => {

    it('should return all resource type definitions with schema', () => {
      const resources = Resources.getDefinitions(true);
      should.exist(resources);
      resources.should.have.length(RESOURCE_TYPES.length);
      resources[0].should.have.all.keys('name', 'path', 'description',
      'format', 'mediatype', 'schema');
    });

    it('should return all resource type definitions excluding schema', () => {
      const resources = Resources.getDefinitions(false);
      should.exist(resources);
      resources[0].should.not.have.key('schema');
    });

  });


  context('getDefinition()', () => {

    it('should throw an error if resource type is invalid', () => {
      const fn = function() {
        return Resources.getDefinition('wrong type');
      };
      fn.should.throw(Error);
    });

    it('should return the definition of a valid resource type', () => {
      const type = 'organization';
      const resource = Resources.getDefinition(type);
      should.exist(resource);
      resource.name.should.equal(type);
      resource.should.not.contain.key('schema');
    });

    it('should return the definition including a schema', () => {
      const type = 'organization';
      const resource = Resources.getDefinition(type, true);
      should.exist(resource);
      resource.name.should.equal(type);
      resource.should.contain.keys('schema');
    });

  });


});
