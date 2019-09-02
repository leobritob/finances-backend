'use strict';

const Schema = use('Schema');

class AddCompanyIdInInvestmentsSchema extends Schema {
  up() {
    this.table('investments', table => {
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
    this.table('investments', table => {
      table.dropColumn('company_id');
    });
  }
}

module.exports = AddCompanyIdInInvestmentsSchema;
