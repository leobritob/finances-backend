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

  billingCyclesTypes() {
    return this.hasMany('BillingCyclesTypeModel');
  }

  billingCyclesCategories() {
    return this.hasMany('BillingCyclesCategoryModel');
  }

  billingCycles() {
    return this.hasMany('BillingCycleModel');
  }

  investments() {
    return this.hasMany('InvestmentModel');
  }

  investmentsTypes() {
    return this.hasMany('InvestmentsTypeModel');
  }
}

module.exports = Company;
