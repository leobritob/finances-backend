'use strict';

const User = use('UserModel');

class CompanySeeder {
  async run() {
    const user = await User.findOrFail(1);
    await user.companies().create({
      social_name: 'Leonardo Brito Bittencourt 44677637830',
      fantasy_name: 'Leonardo Brito Bittencourt',
      cnpj: '30.718.759/0001-75'
    });
  }
}

module.exports = CompanySeeder;
