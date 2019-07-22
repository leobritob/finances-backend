'use strict';

const Model = use('Model');
const BillingCyclesTypesFilter = use(
  'App/ModelFilters/BillingCyclesTypesFilter'
);

class BillingCyclesType extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['BillingCyclesTypeHook.validate']);
    this.addTrait('@provider:Filterable', BillingCyclesTypesFilter);
  }
}

module.exports = BillingCyclesType;
