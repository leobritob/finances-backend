'use strict';

const Schema = use('Schema');

class CitiesSchema extends Schema {
  up() {
    this.create('cities', table => {
      table.increments();
      table.string('name');
      table.integer('uf');
      table.integer('ibge');
      table.specificType('lat_lon', 'POINT');
      table.timestamps();
    });
  }

  down() {
    this.drop('cities');
  }
}

module.exports = CitiesSchema;
