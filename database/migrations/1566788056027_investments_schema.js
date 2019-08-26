'use strict';

const Schema = use('Schema');

class InvestmentsSchema extends Schema {
  up() {
    const dateNow = new Date();

    this.create('investments', table => {
      table.increments();
      table
        .integer('investments_type_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('investments_types')
        .index()
        .onDelete('CASCADE');
      table.string('name').notNullable();
      table.string('description').nullable();
      table
        .float('value')
        .notNullable()
        .defaultTo(0);
      table
        .date('date', { useTz: false })
        .nullable()
        .defaultTo(`${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`);
      table
        .date('due_date', { useTz: false })
        .nullable()
        .defaultTo(`${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`);
      table.timestamps();
    });
  }

  down() {
    this.drop('investments');
  }
}

module.exports = InvestmentsSchema;
