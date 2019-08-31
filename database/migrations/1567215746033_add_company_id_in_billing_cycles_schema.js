'use strict';

const Schema = use('Schema');

class AddCompanyIdInBillingCyclesSchema extends Schema {
  up() {
    this.table('billing_cycles', table => {
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
    this.table('billing_cycles', table => {
      table.dropColumn('company_id');
    });
  }
}

module.exports = AddCompanyIdInBillingCyclesSchema;
