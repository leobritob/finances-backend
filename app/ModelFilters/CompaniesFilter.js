'use strict';

const ModelFilter = use('ModelFilter');

class CompaniesFilter extends ModelFilter {
  search(search) {
    search = search.toLowerCase();
    return this.whereRaw('(lower(social_name) LIKE ? OR lower(fantasy_name) LIKE ? OR lower(cnpj) LIKE ?)', [
      `%${search}%`,
      `%${search}%`,
      `%${search}%`
    ]);
  }
}

module.exports = CompaniesFilter;
