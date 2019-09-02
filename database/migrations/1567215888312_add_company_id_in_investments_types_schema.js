'use strict';

const Schema = use('Schema');

class AddCompanyIdInInvestmentsTypesSchema extends Schema {
  up() {
    this.table('investments_types', table => {
      table
        .integer('company_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('companies')
        .index()
        .onDelete('cascade');
    });
  }

  down() {
    this.table('investments_types', table => {
      table.dropColumn('company_id');
    });
  }
}

module.exports = AddCompanyIdInInvestmentsTypesSchema;
