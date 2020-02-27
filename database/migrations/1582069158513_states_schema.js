'use strict';

const Schema = use('Schema');

class StatesSchema extends Schema {
  up() {
    this.create('states', table => {
      table.increments();
      table.string('name', 255).notNullable();
      table.string('uf', 2).notNullable();
      table.integer('ibge');
      table
        .integer('country_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('countries')
        .index()
        .onDelete('CASCADE');
      table.json('ddd');
      table.timestamps();
    });
  }

  down() {
    this.drop('states');
  }
}

module.exports = StatesSchema;
