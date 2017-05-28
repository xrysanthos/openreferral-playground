const fs = require('fs');
const path = require('path');
const async = require('async');
const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


const {
  Validator
} = require('../../../lib/validators/validator');

const {
  Resources
} = require('../../../lib/validators/resources');

const {
  UnsupportedValidatorError
} = require('../../../lib/validators/errors');


context('Validator', () => {

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
      return p.should.be.resolved;
    });

    it.only('should read data from a local CSV', () => {
      const file = path.resolve(__dirname, 'data/program.csv');
      const stream = fs.createReadStream(file);

      // validate the source against the schema
      const p = new Validator('program').validate(stream);
      return p.should.be.resolved;
    });

    it('should validate all resource types against the sample CSVs', (done) => {

      // get the available resource types
      // const types = Resources.types;
      const types = ['payment_accepted'];
      // go through the list
      async.map(types, (type, done) => {
        const file = path.resolve(__dirname, `data/${type}.csv`);
        const stream = fs.createReadStream(file);

        // validate the source against the schema
        new Validator(type).validate(stream)
          .then(() => done())
          .catch((err) => done(err));
      }, (err) => {

        done(err);
      });

    });

  });


});
