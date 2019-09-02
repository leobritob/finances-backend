'use strict';

const Schema = use('Schema');

class AddCompanyIdInBillingCyclesCategoriesSchema extends Schema {
  up() {
    this.table('billing_cycles_categories', table => {
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
    this.table('billing_cycles_categories', table => {
      table.dropColumn('company_id');
    });
  }
}

module.exports = AddCompanyIdInBillingCyclesCategoriesSchema;
