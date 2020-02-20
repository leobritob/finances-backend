'use strict';

const Schema = use('Schema');

class CountriesSchema extends Schema {
  up() {
    this.create('countries', table => {
      table.increments();
      table.string('name', 255).notNullable();
      table.string('name_translate', 255).notNullable();
      table.string('initials', 2).nullable();
      table.integer('bacen').nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('countries');
  }
}

module.exports = CountriesSchema;
