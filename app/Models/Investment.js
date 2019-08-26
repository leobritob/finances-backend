'use strict';

const Model = use('Model');
const InvestmentsFilter = use('App/ModelFilters/InvestmentsFilter');

class Investment extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['InvestmentHook.validate']);
    this.addTrait('@provider:Filterable', InvestmentsFilter);
  }

  investmentsType() {
    return this.belongsTo('InvestmentsTypeModel');
  }
}

module.exports = Investment;
