'use strict';

const Schema = use('Schema');

class StatesSchema extends Schema {
  up() {
    this.create('states', table => {
      table.increments();
      table.string('name', 60);
      table.string('uf', 2);
      table.integer('ibge');
      table.integer('country');
      table.json('ddd');
      table.timestamps();
    });
  }

  down() {
    this.drop('states');
  }
}

module.exports = StatesSchema;
