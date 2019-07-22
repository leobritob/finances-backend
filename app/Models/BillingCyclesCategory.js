'use strict';

const Model = use('Model');
const BillingCyclesCategoriesFilter = use(
  'App/ModelFilters/BillingCyclesCategoriesFilter'
);

class BillingCyclesCategory extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['BillingCyclesCategorieHook.validate']);
    this.addTrait('@provider:Filterable', BillingCyclesCategoriesFilter);
  }
}

module.exports = BillingCyclesCategory;
