'use strict';

const Schema = use('Schema');

class BillingCyclesCategoriesSchema extends Schema {
  up() {
    this.create('billing_cycles_categories', table => {
      table.increments();
      table
        .integer('billing_cycles_type_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('billing_cycles_types')
        .index()
        .onDelete('CASCADE');
      table.string('name').notNullable();
      table
        .integer('company_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('companies')
        .index()
        .onDelete('cascade');
      table.timestamps();
    });
  }

  down() {
    this.drop('billing_cycles_categories');
  }
}

module.exports = BillingCyclesCategoriesSchema;
