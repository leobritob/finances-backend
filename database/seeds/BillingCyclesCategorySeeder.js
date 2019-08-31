'use strict';

const BillingCyclesType = use('BillingCyclesTypeModel');

class BillingCyclesCategorySeeder {
  async run() {
    const revenue = await BillingCyclesType.query()
      .where('name', 'Receitas')
      .firstOrFail();

    revenue
      .categories()
      .createMany([{ name: 'Salário' }, { name: 'Hora Extra' }, { name: 'Bônus' }, { name: 'Freelance' }]);

    const expenses = await BillingCyclesType.query()
      .where('name', 'Despesas')
      .firstOrFail();

    expenses
      .categories()
      .createMany([
        { name: 'Educação' },
        { name: 'Saúde' },
        { name: 'Transporte' },
        { name: 'Serviços' },
        { name: 'Impostos' },
        { name: 'Taxas e Tarifas' },
        { name: 'Lazer' }
      ]);
  }
}

module.exports = BillingCyclesCategorySeeder;
