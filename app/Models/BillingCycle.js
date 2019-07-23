'use strict';

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
}

module.exports = BillingCycle;
