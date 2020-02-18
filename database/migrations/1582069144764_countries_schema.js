'use strict';

const Schema = use('Schema');

class CountriesSchema extends Schema {
  up() {
    this.create('countries', table => {
      table.increments();
      table.string('name', 60).notNullable();
      table.string('name_translate', 60).notNullable();
      table.string('initials', 2).notNullable();
      table.integer('bacen').nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('countries');
  }
}

module.exports = CountriesSchema;
