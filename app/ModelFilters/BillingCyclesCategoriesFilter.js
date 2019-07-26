'use strict';

const ModelFilter = use('ModelFilter');

class BillingCyclesCategoriesFilter extends ModelFilter {
  billingCyclesType(billing_cycles_type_id) {
    return this.where('billing_cycles_type_id', billing_cycles_type_id);
  }

  name(name) {
    name = name.toLowerCase();
    return this.whereRaw('(lower(name) LIKE ?)', [`%${name}%`]);
  }
}

module.exports = BillingCyclesCategoriesFilter;
