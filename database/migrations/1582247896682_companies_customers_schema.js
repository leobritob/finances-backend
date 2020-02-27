'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CompaniesCustomersSchema extends Schema {
  up() {
    this.create('companies_customers', table => {
      table.increments();
      table
        .integer('company_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('companies')
        .index()
        .onDelete('CASCADE');
      table
        .integer('customer_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('customers')
        .index()
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('companies_customers');
  }
}

module.exports = CompaniesCustomersSchema;
