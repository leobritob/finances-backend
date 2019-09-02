'use strict';

const Schema = use('Schema');

class RemoveCompanyIdFromBillingCyclesTypesSchema extends Schema {
  up() {
    this.table('billing_cycles_types', table => {
      table.dropColumn('company_id');
    });
  }

  down() {
    this.table('billing_cycles_types', table => {
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
}

module.exports = RemoveCompanyIdFromBillingCyclesTypesSchema;
