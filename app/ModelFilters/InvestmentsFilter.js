'use strict';

const ModelFilter = use('ModelFilter');

class InvestmentsFilter extends ModelFilter {
  name(name) {
    name = name.toLowerCase();
    return this.where('(lower(name) LIKE ?)', [`%${name}%`]);
  }

  description(description) {
    description = description.toLowerCase();
    return this.where('(lower(description) LIKE ?)', [`%${description}%`]);
  }

  dateGte(date) {
    return this.whereRaw('DATE(date) >= ?', [date]);
  }
  dateLte(date) {
    return this.whereRaw('DATE(date) <= ?', [date]);
  }

  search(search) {
    search = search.toLowerCase();
    return this.whereRaw('(lower(name) LIKE ? OR lower(description) LIKE ?)', [`%${search}%`, `%${search}%`]);
  }
}

module.exports = InvestmentsFilter;
