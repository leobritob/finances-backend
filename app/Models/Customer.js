'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Customer extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['CustomerHook.validate']);
  }
}

module.exports = Customer;
