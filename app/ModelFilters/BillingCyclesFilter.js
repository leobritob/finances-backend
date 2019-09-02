'use strict';

const ModelFilter = use('ModelFilter');

class BillingCyclesFilter extends ModelFilter {
  billingCyclesCategory(billing_cycles_category_id) {
    return this.where('billing_cycles_category_id', billing_cycles_category_id);
  }

  billingCyclesType(billing_cycles_type_id) {
    return this.related('billingCyclesCategory', 'billing_cycles_type_id', billing_cycles_type_id);
  }

  value(value) {
    this.where('value', value);
  }

  date(date) {
    this.where('date', date);
  }

  description(description) {
    description = description.toLowerCase();
    return this.whereRaw('(lower(description) LIKE ?)', [`%${description}%`]);
  }

  createdAt(created_at) {
    return this.whereRaw('DATE(created_at) = ?', [created_at]);
  }

  dateGte(date) {
    return this.whereRaw('DATE(date) >= ?', [date]);
  }

  dateLte(date) {
    return this.whereRaw('DATE(date) <= ?', [date]);
  }

  search(search) {
    search = search.toLowerCase();
    return this.whereRaw('(lower(description) LIKE ?)', [`%${search}%`]);
  }
}

module.exports = BillingCyclesFilter;
