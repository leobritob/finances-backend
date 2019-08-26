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

  search(search) {
    search = search.toLowerCase();
    return this.where('(lower(name) LIKE ? OR lower(description) LIKE ?)', [`%${search}%`, `%${search}%`]);
  }
}

module.exports = InvestmentsFilter;
