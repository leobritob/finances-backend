'use strict';

const ModelFilter = use('ModelFilter');

class BillingCyclesFilter extends ModelFilter {
  billingCyclesType(billing_cycles_type_id) {
    return this.where('billing_cycles_type_id', billing_cycles_type_id);
  }

  billingCyclesCategory(billing_cycles_category_id) {
    return this.where('billing_cycles_category_id', billing_cycles_category_id);
  }

  value(value) {
    this.where('value', value);
  }

  description(description) {
    description = description.toLowerCase();
    return this.whereRaw('(lower(description) LIKE ?)', [`%${description}%`]);
  }

  createdAt(created_at) {
    return this.whereRaw('DATE(created_at) = ?', [created_at]);
  }

  createdAtGte(created_at) {
    return this.whereRaw('DATE(created_at) >= ?', [created_at]);
  }
  createdAtLte(created_at) {
    return this.whereRaw('DATE(created_at) <= ?', [created_at]);
  }

  search(search) {
    search = search.toLowerCase();
    return this.whereRaw('(lower(description) LIKE ?)', [`%${search}%`]);
  }
}

module.exports = BillingCyclesFilter;
