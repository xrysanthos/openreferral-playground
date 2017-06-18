import {UnsupportedValidatorError} from './errors';

/**
 * Class the generates the appropriate
 * Open Referral validator instances
 * depending on the type of input
 * that needs to be checked.
 *
 * @type ValidatorFactory
 */
export class ValidatorFactory {

  /**
   * Returns the appropriate
   * Open Referral validator
   * instance depending on the
   * requested type.
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  static getInstance(type) {


    switch (type) {


      default:
        throw new UnsupportedValidatorError(
          'Unsupported validator type'
        );
    }

  }

  /**
   * Constructor
   * @param  {[type]} descriptor [description]
   * @param  {[type]} basePath   [description]
   * @param  {[type]} strict     [description]
   * @param  {[type]} profile    [description]
   * @return {[type]}            [description]
   */
  constructor() {


  }


}
