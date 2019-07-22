'use strict';

const ModelFilter = use('ModelFilter');

class BillingCyclesTypesFilter extends ModelFilter {
  name(name) {
    name = name.toLowerCase();
    return this.whereRaw('(lower(name) LIKE ?)', [`%${name}%`]);
  }

  description(description) {
    description = description.toLowerCase();
    return this.whereRaw('(lower(description) LIKE ?)', [`%${description}%`]);
  }
}

module.exports = BillingCyclesTypesFilter;
