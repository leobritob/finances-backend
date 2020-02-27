'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const CompaniesUsersFilter = use('App/ModelFilters/CompaniesUsersFilter');

class CompaniesUser extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['CompaniesUserHook.validate']);
    this.addTrait('@provider:Filterable', CompaniesUsersFilter);
  }

  company() {
    return this.belongsTo('CompanyModel');
  }

  user() {
    return this.belongsTo('UserModel');
  }
}

module.exports = CompaniesUser;
