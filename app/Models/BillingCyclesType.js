'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const BillingCyclesTypesFilter = use('App/ModelFilters/BillingCyclesTypesFilter');

class BillingCyclesType extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['BillingCyclesTypeHook.validate']);
    this.addTrait('@provider:Filterable', BillingCyclesTypesFilter);
  }

  static castDates(field, value) {
    return value.toISOString();
  }

  categories() {
    return this.hasMany('BillingCyclesCategoryModel', 'id', 'billing_cycles_type_id');
  }

  company() {
    return this.hasMany('CompanyModel');
  }
}

module.exports = BillingCyclesType;
