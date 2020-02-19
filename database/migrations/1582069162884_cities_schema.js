'use strict';

const Schema = use('Schema');

class CitiesSchema extends Schema {
  up() {
    this.create('cities', table => {
      table.increments();
      table.string('name', 255).notNullable();
      table
        .integer('state_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('states')
        .index()
        .onDelete('CASCADE');
      table.integer('ibge');
      table
        .integer('country_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('countries')
        .index()
        .onDelete('CASCADE');
      table.specificType('lat_lon', 'POINT');
      table.timestamps();
    });
  }

  down() {
    this.drop('cities');
  }
}

module.exports = CitiesSchema;
