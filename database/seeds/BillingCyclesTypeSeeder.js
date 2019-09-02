'use strict';

const Company = use('CompanyModel');

class BillingCyclesTypeSeeder {
  async run() {
    const company = await Company.findOrFail(1);

    await company.billingCyclesTypes().createMany([
      {
        name: 'Receitas',
        description: 'Receitas'
      },
      {
        name: 'Despesas',
        description: 'Despesas'
      }
    ]);
  }
}

module.exports = BillingCyclesTypeSeeder;
