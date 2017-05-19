const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


const {
  Validator
} = require('../../../lib/validators/validator');

const {
  UnsupportedValidatorError,
  DataValidationError
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

    it.only('should through an error if dataset is not an array', () => {

      const data = [
        ['30b83c60-64a1-11e6-8b77-86f30ca893d1',
          'Name',
          'Alternate name',
          'Description',
          'org@example.com',
          'http://org.example.com',
          'Tax status',
          'Tax ID',
          '1990-01-01',
          'Legal status'
        ],
        ['30b83c60-64a1-11e6-8b77-86f30ca893d2',
          'Name',
          'Alternate name',
          'Description',
          'org@example.com',
          'http://org.example.com',
          'Tax status',
          'Tax ID',
          '1990-01-01',
          'Legal status'
        ],
        ['30b83c60-64a1-11e6-8b77-86f30ca893d3',
          'Name',
          'Alternate name',
          'Description',
          'org@example.com',
          'http://org.example.com',
          'Tax status',
          'Tax ID',
          '1990-01-01',
          'Legal status'
        ],
        ['30b83c60-64a1-11e6-8b77-86f30ca893d4',
          'Name',
          'Alternate name',
          'Description',
          'org@example.com',
          'http://org.example.com',
          'Tax status',
          'Tax ID',
          '1990-01-01',
          'Legal status'
        ]
      ];

      // validate the source against the schema
      const p = new Validator('organization').validate(data);

      return p.then().catch(err => {
        console.log(err.row, err.errors);
      });
      // return p.should.be.resolved;

    });

  });

});
