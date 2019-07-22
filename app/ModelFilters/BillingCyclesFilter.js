'use strict';

const ModelFilter = use('ModelFilter');

class BillingCyclesFilter extends ModelFilter {
  billingCicyleType(billing_cycles_type_id) {
    return this.where('billing_cycles_type_id', billing_cycles_type_id);
  }

  value(value) {
    this.where('value', value);
  }

  description(description) {
    description = description.toLowerCase();
    return this.whereRaw('(lower(description) LIKE ?)', [`%${description}%`]);
  }

  createdAt(created_at) {
    return this.where('created_at', created_at);
  }
}

module.exports = BillingCyclesFilter;
