'use strict';

const Schema = use('Schema');

class BillingCyclesSchema extends Schema {
  up() {
    this.create('billing_cycles', table => {
      table.increments();
      table.integer('type').notNullable();
      table
        .float('value')
        .notNullable()
        .defaultTo(0);
      table.string('description').nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('billing_cycles');
  }
}

module.exports = BillingCyclesSchema;
