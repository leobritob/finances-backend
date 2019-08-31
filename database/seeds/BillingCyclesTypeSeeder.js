'use strict';

const BillingCyclesType = use('BillingCyclesTypeModel');

class BillingCyclesTypeSeeder {
  async run() {
    await BillingCyclesType.create({
      name: 'Receitas',
      description: 'Receitas'
    });

    await BillingCyclesType.create({
      name: 'Despesas',
      description: 'Despesas'
    });
  }
}

module.exports = BillingCyclesTypeSeeder;
