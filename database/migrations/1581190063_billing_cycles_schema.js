'use strict';

const Schema = use('Schema');

class BillingCyclesSchema extends Schema {
  up() {
    const dateNow = new Date();

    this.create('billing_cycles', table => {
      table.increments();
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
      table
        .date('date', { useTz: false })
        .nullable()
        .defaultTo(
          `${dateNow.getFullYear()}-${dateNow.getMonth() +
            1}-${dateNow.getDate()}`
        );
      table.string('description').nullable();
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
    this.drop('billing_cycles');
  }
}

module.exports = BillingCyclesSchema;
