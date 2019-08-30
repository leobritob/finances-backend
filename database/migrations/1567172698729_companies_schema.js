'use strict';

const Schema = use('Schema');

class CompaniesSchema extends Schema {
  up() {
    this.create('companies', table => {
      table.increments();
      table.string('social_name').notNullable();
      table.string('fantasy_name').notNullable();
      table.string('cnpj', 18).notNullable();
      table.string('email');
      table.string('cellphone');
      table.string('telephone');
      table.string('street_name');
      table.string('street_number');
      table.string('district');
      table.string('city');
      table.string('uf');
      table.string('country');
      table.string('logo');
      table.timestamps();
    });
  }

  down() {
    this.drop('companies');
  }
}

module.exports = CompaniesSchema;
