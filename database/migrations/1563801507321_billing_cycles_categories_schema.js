'use strict';

const Schema = use('Schema');

class BillingCyclesCategoriesSchema extends Schema {
  up() {
    this.create('billing_cycles_categories', table => {
      table.increments();
      table.string('name').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('billing_cycles_categories');
  }
}

module.exports = BillingCyclesCategoriesSchema;
