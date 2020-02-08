'use strict';

const Schema = use('Schema');

class AddColorToInvestmentsTypesSchema extends Schema {
  up() {
    this.table('investments_types', table => {
      table
        .string('color', 7)
        .defaultTo('#000000')
        .notNullable();
    });
  }

  down() {
    this.table('investments_types', table => {
      table.dropColumn('color');
    });
  }
}

module.exports = AddColorToInvestmentsTypesSchema;
