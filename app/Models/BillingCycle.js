'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const BillingCycleFilter = use('App/ModelFilters/BillingCyclesFilter');

class BillingCycle extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['BillingCycleHook.validate']);
    this.addTrait('@provider:Filterable', BillingCycleFilter);
  }

  static castDates(field, value) {
    return value.toISOString();
  }

  billingCyclesCategory() {
    return this.belongsTo('BillingCyclesCategoryModel');
  }

  company() {
    return this.belongsTo('CompanyModel');
  }
}

module.exports = BillingCycle;
