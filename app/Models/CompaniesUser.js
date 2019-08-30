'use strict';

const Model = use('Model');
const CompaniesUsersFilter = use('App/ModelFilters/CompaniesUsersFilter');

class CompaniesUser extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['CompaniesUserHook.validate']);
    this.addTrait('@provider:Filterable', CompaniesUsersFilter);
  }
}

module.exports = CompaniesUser;
