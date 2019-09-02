'use strict';

const BillingCyclesType = use('BillingCyclesTypeModel');

class BillingCyclesCategorySeeder {
  async run() {
    const revenue = await BillingCyclesType.query()
      .where('name', 'Receitas')
      .firstOrFail();

    await revenue
      .categories()
      .createMany([
        { name: 'Salário', company_id: 1 },
        { name: 'Hora Extra', company_id: 1 },
        { name: 'Bônus', company_id: 1 },
        { name: 'Freelance', company_id: 1 }
      ]);

    const expenses = await BillingCyclesType.query()
      .where('name', 'Despesas')
      .firstOrFail();

    await expenses
      .categories()
      .createMany([
        { name: 'Educação', company_id: 1 },
        { name: 'Saúde', company_id: 1 },
        { name: 'Transporte', company_id: 1 },
        { name: 'Serviços', company_id: 1 },
        { name: 'Impostos', company_id: 1 },
        { name: 'Taxas e Tarifas', company_id: 1 },
        { name: 'Lazer', company_id: 1 }
      ]);
  }
}

module.exports = BillingCyclesCategorySeeder;
