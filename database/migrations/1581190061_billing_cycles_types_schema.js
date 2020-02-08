'use strict';

const Schema = use('Schema');

class BillingCyclesTypesSchema extends Schema {
  up() {
    this.create('billing_cycles_types', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('description').nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('billing_cycles_types');
  }
}

module.exports = BillingCyclesTypesSchema;
