'use strict';

const Schema = use('Schema');

class BillingCyclesSchema extends Schema {
  up() {
    this.create('billing_cycles', table => {
      table.increments();
      table
        .integer('billing_cycles_type_id')
        .unsigned()
        .references('id')
        .inTable('billing_cycles_types')
        .index()
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('billing_cycles_category_id')
        .unsigned()
        .references('id')
        .inTable('billing_cycles_categories')
        .index()
        .onDelete('CASCADE')
        .notNullable();
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
