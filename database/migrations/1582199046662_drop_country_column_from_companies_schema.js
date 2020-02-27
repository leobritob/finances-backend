'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DropCountryColumnFromCompaniesSchema extends Schema {
  up() {
    this.table('companies', table => {
      table.dropColumn('country');
    });
  }

  down() {
    this.table('companies', table => {
      table.string('country');
    });
  }
}

module.exports = DropCountryColumnFromCompaniesSchema;
