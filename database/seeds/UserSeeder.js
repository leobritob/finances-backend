'use strict';

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory');

const User = use('App/Models/User');

class UserSeeder {
  async run() {
    await User.create({
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@admin.com',
      password: '123456789'
    });
  }
}

module.exports = UserSeeder;
