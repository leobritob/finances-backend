'use strict';

const Model = use('Model');
const CompaniesFilter = use('App/ModelFilters/CompaniesFilter');

class Company extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['CompanyHook.validate']);
    this.addTrait('@provider:Filterable', CompaniesFilter);
  }

  static castDates(field, value) {
    return value.toISOString();
  }

  users() {
    return this.belongsToMany('UserModel').pivotModel('CompaniesUserModel');
  }
}

module.exports = Company;
