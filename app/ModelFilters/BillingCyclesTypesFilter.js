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

  search(search) {
    search = search.toLowerCase();
    return this.whereRaw('(lower(name) LIKE ? OR lower(description) LIKE ?)', [
      `%${search}%`,
      `%${search}%`
    ]);
  }
}

module.exports = BillingCyclesTypesFilter;
