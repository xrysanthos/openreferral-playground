const fs = require('fs');
const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
const SinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const should = chai.should();
chai.use(SinonChai);
chai.use(chaiAsPromised);


const {
  Validator
} = require('../../../lib/validators/validator');


const {
  UnsupportedValidatorError
} = require('../../../lib/validators/errors');

const sandbox = sinon.sandbox.create();

context('Validator', () => {

  afterEach(() => {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  });


  context('constructor()', () => {

    it('should through an error if resource type is unsupported', () => {
      const fn = function() {
        return new Validator();
      };
      fn.should.throw(UnsupportedValidatorError);
    });

    it('should load the corresponding resource schema', () => {
      const v = new Validator('organization');
      should.exist(v.schema);
    });
  });

  context('validate()', () => {

    it('should throw an error if data source is empty / undefined', () => {

      const p = new Validator('organization').validate();
      return p.should.be.rejected;
    });

    it('should read data from an array of values', () => {
      const data = [
        [
          '1',
          'c89eb05c-62dd-4b64-b494-0cc347b6ea7f',
          'Program name',
          'Alternate name'
        ]
      ];

      // validate the source against the schema
      const p = new Validator('program').validate(data);
      return p.should.be.fulfilled;
    });

    it('should read data from a local CSV', () => {
      const file = path.resolve(__dirname, 'samples/program.csv');
      const stream = fs.createReadStream(file);

      // validate the source against the schema
      const p = new Validator('program').validate(stream);
      return p.should.be.fulfilled;
    });


  });

});
