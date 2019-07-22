'use strict';

const ModelFilter = use('ModelFilter');

class BillingCyclesCategoriesFilter extends ModelFilter {
  name(name) {
    name = name.toLowerCase();
    return this.whereRaw('(lower(name) LIKE ?)', [`%${name}%`]);
  }
}

module.exports = BillingCyclesCategoriesFilter;
