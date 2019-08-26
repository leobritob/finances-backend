'use strict';

const Model = use('Model');
const InvestmentsTypesFilter = use('App/ModelFilters/InvestmentsTypesFilter');

class InvestmentsType extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['InvestmentsTypeHook.validate']);
    this.addTrait('@provider:Filterable', InvestmentsTypesFilter);
  }
}

module.exports = InvestmentsType;
