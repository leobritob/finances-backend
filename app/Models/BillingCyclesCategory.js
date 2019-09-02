'use strict';

const Model = use('Model');
const BillingCyclesCategoriesFilter = use('App/ModelFilters/BillingCyclesCategoriesFilter');

class BillingCyclesCategory extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['BillingCyclesCategoryHook.validate']);
    this.addTrait('@provider:Filterable', BillingCyclesCategoriesFilter);
  }

  static castDates(field, value) {
    return value.toISOString();
  }

  billingCyclesType() {
    return this.belongsTo('BillingCyclesTypeModel');
  }

  company() {
    return this.belongsTo('CompanyModel');
  }
}

module.exports = BillingCyclesCategory;
