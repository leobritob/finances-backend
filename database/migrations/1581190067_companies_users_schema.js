'use strict';

const Schema = use('Schema');

class CompaniesUsersSchema extends Schema {
  up() {
    this.create('companies_users', table => {
      table.increments();
      table
        .integer('company_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('companies')
        .index()
        .onDelete('cascade');
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .index()
        .onDelete('cascade');
      table.timestamps();
    });
  }

  down() {
    this.drop('companies_users');
  }
}

module.exports = CompaniesUsersSchema;
