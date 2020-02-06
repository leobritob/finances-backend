'use strict';

const User = use('UserModel');
const Company = use('CompanyModel');
const BillingCyclesType = use('BillingCyclesTypeModel');

class DevelopmentSeeder {
  async run() {
    await this.createUser();
    await this.createCompany();
    await this.createInvestmentsTypes();
    await this.createBillingCyclesType();
    await this.createBillingCyclesCategories();
  }

  async createUser() {
    await User.create({
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@admin.com',
      password: '123456789'
    });
  }

  async createCompany() {
    const user = await User.query().firstOrFail();
    await user.companies().create({
      social_name: 'Leonardo Brito Bittencourt 44677637830',
      fantasy_name: 'Leonardo Brito Bittencourt',
      cnpj: '30.718.759/0001-75'
    });
  }

  async createInvestmentsTypes() {
    const company = await Company.query().firstOrFail();
    await company.investmentsTypes().createMany([
      {
        name: 'Tesouro Selic',
        description: 'Tesouro Selic',
        risk: 1,
        color: '#FF6384'
      },
      {
        name: 'Tesouro IPCA',
        description: 'Tesour IPCA',
        risk: 1,
        color: '#11AA84'
      },
      {
        name: 'Tesouro Prefixado',
        description: 'Tesour Prefixado',
        risk: 1,
        color: '#FFAA00'
      },
      { name: 'Ações', description: 'Ações', risk: 3, color: '#36A2EB' },
      {
        name: 'Fundos de Investimento Imobiliário (FIIs)',
        description: 'Fundos de Investimento Imobiliário (FIIs)',
        risk: 3,
        color: '#FFCE56'
      }
    ]);
  }

  async createBillingCyclesType() {
    const company = await Company.query()
      .where()
      .firstOrFail();
    await company.billingCyclesTypes().createMany([
      { name: 'Receitas', description: 'Receitas' },
      { name: 'Despesas', description: 'Despesas' }
    ]);
  }

  async createBillingCyclesCategories() {
    const revenue = await BillingCyclesType.query()
      .where('name', 'Receitas')
      .firstOrFail();

    await revenue.categories().createMany([
      { name: 'Salário', company_id: 1 },
      { name: 'Hora Extra', company_id: 1 },
      { name: 'Bônus', company_id: 1 },
      { name: 'Freelance', company_id: 1 }
    ]);

    const expenses = await BillingCyclesType.query()
      .where('name', 'Despesas')
      .firstOrFail();

    await expenses.categories().createMany([
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

module.exports = DevelopmentSeeder;
