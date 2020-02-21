'use strict';

const Schema = use('Schema');

class CustomersSchema extends Schema {
  up() {
    this.create('customers', table => {
      table.increments();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.date('birthday_date').nullable();
      table.string('gender').nullable();
      table.string('profession').nullable();
      table.string('cellphone').nullable();
      table.string('phone').nullable();
      table.string('cpf').notNullable();
      table.string('rg').nullable();
      table.string('street_name').nullable();
      table.string('street_number').nullable();
      table.string('district').nullable();
      table.string('zipcode').nullable();
      table
        .integer('city_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('cities')
        .index()
        .onDelete('CASCADE');
      table
        .integer('state_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('states')
        .index()
        .onDelete('CASCADE');
      table
        .integer('country_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('countries')
        .index()
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('customers');
  }
}

module.exports = CustomersSchema;
