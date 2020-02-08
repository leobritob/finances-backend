'use strict';

const User = use('UserModel');
const Company = use('CompanyModel');
const BillingCyclesType = use('BillingCyclesTypeModel');
const InvestmentsType = use('InvestmentsTypeModel');
const BillingCyclesCategory = use('BillingCyclesCategoryModel');

class DevelopmentSeeder {
  async run() {
    await this.createUser();
    await this.createCompany();
    await this.createInvestmentsTypes();
    await this.createBillingCyclesType();
    await this.createBillingCyclesCategories();
  }

  async createUser() {
    const email = 'admin@admin.com';

    const user = await User.query()
      .where('email', email)
      .first();

    if (user) {
      return false;
    }

    return User.create({
      first_name: 'Admin',
      last_name: 'User',
      email,
      password: '123456789',
    });
  }

  async createCompany() {
    const cnpj = '30.718.759/0001-75';

    const company = await Company.query().where({ cnpj }).first();
    if (company) {
      return false;
    }

    const user = await this.getUser();
    return user.companies().create({
      social_name: 'Leonardo Brito Bittencourt 44677637830',
      fantasy_name: 'Leonardo Brito Bittencourt',
      cnpj,
    });
  }

  async createInvestmentsTypes() {
    const company = await this.getCompany();

    const investmentsTypes = await InvestmentsType.query()
      .whereIn('name', [
        'Tesouro Selic',
        'Tesouro IPCA',
        'Tesouro Prefixado',
        'Ações',
        'Fundos de Investimento Imobiliário (FIIs)',
      ])
      .fetch();
    if (investmentsTypes.rows.length > 0) {
      return false;
    }

    await company.investmentsTypes().createMany([
      {
        name: 'Tesouro Selic',
        description: 'Tesouro Selic',
        risk: 1,
        color: '#FF6384',
      },
      {
        name: 'Tesouro IPCA',
        description: 'Tesour IPCA',
        risk: 1,
        color: '#11AA84',
      },
      {
        name: 'Tesouro Prefixado',
        description: 'Tesour Prefixado',
        risk: 1,
        color: '#FFAA00',
      },
      { name: 'Ações', description: 'Ações', risk: 3, color: '#36A2EB' },
      {
        name: 'Fundos de Investimento Imobiliário (FIIs)',
        description: 'Fundos de Investimento Imobiliário (FIIs)',
        risk: 3,
        color: '#FFCE56',
      },
    ]);
  }

  async createBillingCyclesType() {
    const billingCyclesTypes = await BillingCyclesType.query()
      .whereIn('name', ['Receitas', 'Despesas'])
      .fetch();

    if (billingCyclesTypes.rows.length > 0) {
      return false;
    }

    return BillingCyclesType.createMany([
      { name: 'Receitas', description: 'Ciclo de pagamentos do tipo Receitas' },
      { name: 'Despesas', description: 'Ciclo de pagamentos do tipo Despesas' },
    ]);
  }

  async createBillingCyclesCategories() {
    const revenue = await this.getBillingCycleType();

    const billingCyclesCategories = await BillingCyclesCategory.query()
      .whereIn('name', [
        'Salário',
        'Hora Extra',
        'Bônus',
        'Freelance',
        'Educação',
        'Saúde',
        'Transporte',
        'Serviços',
        'Impostos',
        'Taxas e Tarifas',
        'Lazer',
      ])
      .fetch();

    if (billingCyclesCategories.rows.length > 0) {
      return false;
    }

    await revenue.categories().createMany([
      { name: 'Salário', company_id: 1 },
      { name: 'Hora Extra', company_id: 1 },
      { name: 'Bônus', company_id: 1 },
      { name: 'Freelance', company_id: 1 },
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
      { name: 'Lazer', company_id: 1 },
    ]);
  }

  async getUser() {
    return User.query()
      .where('email', 'admin@admin.com')
      .firstOrFail();
  }

  async getCompany() {
    return Company.query()
      .where('cnpj', '30.718.759/0001-75')
      .firstOrFail();
  }

  async getBillingCycleType() {
    return BillingCyclesType.query()
      .where('name', 'Receitas')
      .firstOrFail();
  }
}

module.exports = DevelopmentSeeder;
