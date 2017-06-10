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
  UnsupportedValidatorError,
  DataValidationError
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
      const file = path.resolve(__dirname, 'data/program.csv');

      // check if the file exists
      fs.statSync(file);

      const stream = fs.createReadStream(file);

      // validate the source against the schema
      const p = new Validator('program').validate(stream);
      return p.should.be.fulfilled;
    });

    it('should throw an error if a row has less fields', () => {
      const data = [
        [
          '1',
          'c89eb05c-62dd-4b64-b494-0cc347b6ea7f',
          'Program name'
        ]
      ];

      // validate the source against the schema
      const p = new Validator('program').validate(data);
      return p.should.be.rejectedWith(DataValidationError,
        'Error at row 0 - The number of items to convert ' +
        'does not match the number of fields given in the schema');
    });

    it('should throw an error if a row has more fields', () => {
      const data = [
        [
          '1',
          'c89eb05c-62dd-4b64-b494-0cc347b6ea7f',
          'Program name',
          'Alternate name',
          'an extra field'
        ]
      ];

      // validate the source against the schema
      const p = new Validator('program').validate(data);
      return p.should.be.rejectedWith(DataValidationError,
        'Error at row 0 - The number of items to convert ' +
        'does not match the number of fields given in the schema');
    });

    it('should throw an error that states the bad record row', (done) => {
      const data = [
        ['1', '1', '1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
          '1', '1', '123456789', '0', 'text', 'English',
          'test phone', 'some dept'
        ],
        ['1', '1', '1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
          '1', '1', '123456789', '0', 'voice', 'English',
          'test phone', 'some dept', 'dsfsdf'
        ]
      ];

      // validate the source against the schema
      new Validator('phone').validate(data).catch(err => {
        err.message.should.equal('Error at row 1 - The number of items ' +
          'to convert does not match the number of fields given in the schema');
        err.row.should.equal(1);
        done();
      });

    });

    it('should throw an error if a bad enum value is provided', () => {
      const data = [
        ['1', '1', 'cd', 'details go here'],
        ['1', '1', 'bad_enum', 'details go here']
      ];

      // validate the source against the schema
      const p = new Validator('accessibility_for_disabilities').validate(data);
      return p.should.be.rejectedWith(DataValidationError,
        'Error at row 1 - Wrong type for header: accessibility and value: bad_enum');
    });

    it('should throw an error if wrong type of value is provided', () => {
      const data = [
        [123,
          'org A',
          'alter org A', 'A descr',
          'org@example.com', 'http://www.example.com',
          'tax status', '1',
          '1990-01-01', 'private'
        ]
      ];

      // validate the source against the schema
      const p = new Validator('organization').validate(data);
      return p.should.be.rejectedWith(DataValidationError,
        'Error at row 0 - Wrong type for header: id and value: 123');
    });

    it('should throw an error if a bad formatted \'email\' value is provided', () => {
      const data = [
        ['aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
          'org A',
          'alter org A', 'A descr',
          '@example.com', 'http://www.example.com',
          'tax status', '1',
          '1990-01-01', 'private'
        ]
      ];

      // validate the source against the schema
      const p = new Validator('organization').validate(data);
      return p.should.be.rejectedWith(DataValidationError,
        'Error at row 0 - Wrong type for header: email and value: @example.com');
    });


    it('should throw an error if a bad formatted \'uri\' value is provided', () => {
      const data = [
        ['aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
          'org A',
          'alter org A', 'A descr',
          'someone@example.com', 'http:example.com',
          'tax status', '1',
          '1990-01-01', 'private'
        ]
      ];

      // validate the source against the schema
      const p = new Validator('organization').validate(data);
      return p.should.be.rejectedWith(DataValidationError,
        'Error at row 0 - Wrong type for header: url and value: http:example.com');
    });

  });

});
