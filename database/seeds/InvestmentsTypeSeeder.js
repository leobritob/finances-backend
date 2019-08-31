'use strict';

const InvestmentsType = use('InvestmentsTypeModel');

class InvestmentsTypeSeeder {
  async run() {
    await InvestmentsType.createMany([
      { name: 'Tesouro Selic', description: 'Tesouro Selic', risk: 1, color: '#FF6384' },
      { name: 'Tesouro IPCA', description: 'Tesour IPCA', risk: 1, color: '#11AA84' },
      { name: 'Tesouro Prefixado', description: 'Tesour Prefixado', risk: 1, color: '#FFAA00' },
      { name: 'Ações', description: 'Ações', risk: 3, color: '#36A2EB' },
      {
        name: 'Fundos de Investimento Imobiliário (FIIs)',
        description: 'Fundos de Investimento Imobiliário (FIIs)',
        risk: 3,
        color: '#FFCE56'
      }
    ]);
  }
}

module.exports = InvestmentsTypeSeeder;
