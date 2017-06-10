const chai = require('chai');
const sinon = require('sinon');
const SinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(SinonChai);
chai.use(chaiAsPromised);

const {
  Validator
} = require('../../../../lib/validators/validator');

const sandbox = sinon.sandbox.create();

context('Schema validation of all resource types', () => {

  afterEach(() => {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  });

  it('should validate resources of type \'accessibility_for_disabilities\'', (done) => {

    const data = [
      ['1', '1', 'cd', 'details go here'],
      ['1', '1', 'deaf_interpreter', 'details go here'],
      ['1', '1', 'disabled_parking', 'details go here'],
      ['1', '1', 'elevator', 'details go here'],
      ['1', '1', 'ramp', 'details go here'],
      ['1', '1', 'restroom', 'details go here'],
      ['1', '1', 'tape_braille', 'details go here'],
      ['1', '1', 'tty', 'details go here'],
      ['1', '1', 'wheelchair', 'details go here'],
      ['1', '1', 'wheelchair_van', 'details go here']
    ];

    new Validator('accessibility_for_disabilities')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'contact\'', (done) => {

    const data = [
      ['1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '1', '1',
        'joe doe', 'Mr', 'some dept', 'joe.doe@example.com']
    ];

    new Validator('contact')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'eligibility\'', (done) => {

    const data = [
      ['1', '1', 'adult'],
      ['1', '1', 'child'],
      ['1', '1', 'teen'],
      ['1', '1', 'family'],
      ['1', '1', 'female'],
      ['1', '1', 'male'],
      ['1', '1', 'Transgender'],
      ['1', '1', 'Transgender - M to F'],
      ['1', '1', 'Transgender - F to M']
    ];

    new Validator('eligibility')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'funding\'', (done) => {

    const data = [
      ['1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '1', 'source of funds']
    ];

    new Validator('funding')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'holiday_schedule\'', (done) => {

    const data = [
      ['1', '1', '1', '1', false, '12:00:00',
        '14:00:00', '2017-01-01', '2017-01-10']
    ];

    new Validator('holiday_schedule')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'language\'', (done) => {

    const data = [
      ['1', '1', '1', 'en']
    ];

    new Validator('language')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'location\'', (done) => {

    const data = [
      ['1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'location A',
        'alternate name', 'location descr', 'public', '42.899107', '12.766113']
    ];

    new Validator('location')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'meta_table_description\'', (done) => {

    const data = [
      ['1', 'a name', 'en', 'utf-8']
    ];

    new Validator('meta_table_description')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'metadata\'', (done) => {

    const data = [
      ['1', '1', '2017-01-01T00:00:00Z', 'create',
        'fieldName', '10', '20', 'joe doe']
    ];

    new Validator('metadata')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'organization\'', (done) => {

    const data = [
      ['aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'org A',
        'alter org A', 'A descr',
        'org@example.com', 'http://www.example.com',
        'tax status', '1',
        '1990-01-01', 'private'
      ]
    ];

    new Validator('organization')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'payment_accepted\'', (done) => {

    const data = [
      ['1', '1', 'cash'],
      ['1', '1', 'check'],
      ['1', '1', 'money order'],
      ['1', '1', 'credit card'],
      ['1', '1', 'medicare'],
      ['1', '1', 'SNAP'],
      ['1', '1', 'WIC'],
      ['1', '1', 'EBT']
    ];

    new Validator('payment_accepted')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'phone\'', (done) => {

    const data = [
      ['1', '1', '1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
        '1', '1', '123456789', '0', 'text', 'English',
        'test phone', 'some dept'
      ],
      ['2', '1', '1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
        '1', '1', '123456789', '0', 'voice', 'English',
        'test phone', 'some dept'
      ],
      ['3', '1', '1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
        '1', '1', '123456789', '0', 'fax', 'English',
        'test phone', 'some dept'
      ],
      ['4', '1', '1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
        '1', '1', '123456789', '0', 'cell', 'English',
        'test phone', 'some dept'
      ],
      ['5', '1', '1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
        '1', '1', '123456789', '0', 'video', 'English',
        'test phone', 'some dept'
      ],
      ['6', '1', '1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
        '1', '1', '123456789', '0', 'pager', 'English',
        'test phone', 'some dept'
      ],
      ['7', '1', '1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
        '1', '1', '123456789', '0', 'textphone', 'English',
        'test phone', 'some dept'
      ]
    ];

    new Validator('phone')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'physical_address\'', (done) => {

    const data = [
      ['1', '1', 'joe doe', 'address 1', 'address 2', 'address 3',
        'address 4', 'some city', 'some region', 'some state', '123456', 'US'
      ]
    ];

    new Validator('physical_address')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'postal_address\'', (done) => {

    const data = [
      ['1', '1', 'joe doe', 'address 1', 'address 2', 'address 3',
        'address 4', 'some city', 'some region', 'some state', '123456', 'US'
      ]
    ];

    new Validator('postal_address')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'program\'', (done) => {

    const data = [
      ['1', 'c89eb05c-62dd-4b64-b494-0cc347b6ea7f',
        'program A', 'alternate name for program A'
      ],
      ['2', 'c89eb05c-62dd-4b64-b494-0cc347b6ea71',
        'program B', 'alternate name for program B'
      ]
    ];

    new Validator('program')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'regular_schedule\'', (done) => {

    const data = [
      ['1', '1', '1', '1', '2', '23:00:00', '14:00:00']
    ];

    new Validator('regular_schedule')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'required_document\'', (done) => {

    const data = [
      ['1', '1', 'EU Passport']
    ];

    new Validator('required_document')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'service_area\'', (done) => {

    const data = [
      ['1', '1', 'geo area', 'some descr']
    ];

    new Validator('service_area')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'service_at_location\'', (done) => {

    const data = [
      ['1', '1', '1', 'description']
    ];

    new Validator('service_at_location')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'service_taxonomy\'', (done) => {

    const data = [
      ['1', '1', 'taxonomy id', 'taxonomy detail']
    ];

    new Validator('service_taxonomy')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'service\'', (done) => {

    const data = [
      ['1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '1', 'service A',
        'alternate name for service A', 'service description',
        'http://service.example.com', 'service@example.com', 'active',
        'interpretation services', 'application process', '1 day',
        'fees', 'accrediations', 'licenses', 'unused'
      ],
      ['2', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '1', 'service A',
        'alternate name for service A', 'service description',
        'http://service.example.com', 'service@example.com', 'inactive',
        'interpretation services', 'application process', '1 day',
        'fees', 'accrediations', 'licenses', 'unused'
      ],
      ['3', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '1', 'service A',
        'alternate name for service A', 'service description',
        'http://service.example.com', 'service@example.com', 'defunct',
        'interpretation services', 'application process', '1 day',
        'fees', 'accrediations', 'licenses', 'unused'
      ],
      ['4', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '1', 'service A',
        'alternate name for service A', 'service description',
        'http://service.example.com', 'service@example.com', 'temporarily closed',
        'interpretation services', 'application process', '1 day',
        'fees', 'accrediations', 'licenses', 'unused'
      ]
    ];

    new Validator('service')
      .validate(data)
      .then(done)
      .catch(done);
  });

  it('should validate resources of type \'taxonomy\'', (done) => {

    const data = [
      ['1', 'taxonomy name', 'parent id', 'parent name', 'AIRS']
    ];

    new Validator('taxonomy')
      .validate(data)
      .then(done)
      .catch(done);
  });

});
