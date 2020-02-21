'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class CompaniesCustomer extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['CompaniesCustomerHook.validate']);
  }
}

module.exports = CompaniesCustomer;
