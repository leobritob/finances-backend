'use strict';

const Model = use('Model');
const InvestmentsTypesFilter = use('App/ModelFilters/InvestmentsTypesFilter');

class InvestmentsType extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['InvestmentsTypeHook.validate']);
    this.addTrait('@provider:Filterable', InvestmentsTypesFilter);
  }

  static get computed() {
    return ['risk_label'];
  }

  getRiskLabel({ risk }) {
    switch (risk) {
    case 1:
      return 'Baixo';
    case 2:
      return 'Moderado';
    case 3:
      return 'Alto';
    default:
      return risk;
    }
  }
}

module.exports = InvestmentsType;
