import jts from 'tableschema';

import {
  RESOURCE_TYPES
} from './constants';

import {
  UnsupportedValidatorError,
  DataValidationError
} from './errors';


/**
 * Class used for validating
 * Open Referral resources.
 *
 * @type Validator
 */
export class Validator {


  /**
   * Constructor
   * @param  {[type]} descriptor [description]
   * @param  {[type]} basePath   [description]
   * @param  {[type]} strict     [description]
   * @param  {[type]} profile    [description]
   * @return {[type]}            [description]
   */
  constructor(resourceType) {

    // check if resource type
    // is valid
    if (RESOURCE_TYPES.indexOf(resourceType) === -1) {
      throw new UnsupportedValidatorError(
        'One of the valid resource types should provided');
    }

    this._type = resourceType;

    // load the schema file that maps
    // to the requested resource type
    this._schema = require(`./schemas/${resourceType}.json`);

  }

  /**
   * Returns the schema
   * for that maps to
   * the selected resource type
   * @return {[type]} [description]
   */
  get schema() {
    return this._schema;
  }

  get type() {
    return this._type;
  }


  /**
   * Validates an input data source against
   * the resource specific schema.
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  validate(source) {

    return new Promise((resolve, reject) => {

      try {
        if (typeof source === 'undefined') {
          throw new Error('A valid data source is required');
        }

        if (typeof this.schema === 'undefined') {
          throw new Error('No schema found for validating this type of resource');
        }

        const Table = jts.Table;

        let idx = 0;

        new Table(this._schema, source).then(table => {
          table.iter((items) => {
            // keep track of the index
            idx += 1;
            console.log(items);
          }, true, false).then(() => {
            resolve();
          }, errors => {

            // throw a DataValidationError
            const err = new DataValidationError(idx, errors);
            reject(err);
          });
        });


      } catch (e) {

        reject(e);
      }
    });

  }


}
