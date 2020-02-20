'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddCountryIdColumnToCompaniesSchema extends Schema {
  up() {
    this.table('companies', table => {
      table
        .integer('country_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('countries')
        .index()
        .onDelete('CASCADE');
    });
  }

  down() {
    this.table('companies', table => {
      table.dropColumn('country_id');
    });
  }
}

module.exports = AddCountryIdColumnToCompaniesSchema;
