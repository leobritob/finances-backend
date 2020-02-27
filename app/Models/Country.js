'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Country extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['CountryHook.validate']);
  }
}

module.exports = Country;
