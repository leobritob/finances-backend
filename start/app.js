'use strict';

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  'adonis-acl/providers/AclProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/drive/providers/DriveProvider',
  'adonis-lucid-filter/providers/LucidFilterProvider',
  '@adonisjs/mail/providers/MailProvider',
  '@adonisjs/vow/providers/VowProvider'
];

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  'adonis-acl/providers/CommandsProvider'
];

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  Role: 'Adonis/Acl/Role',
  Permission: 'Adonis/Acl/Permission',

  // Models
  TokenModel: 'App/Models/Token',
  UserModel: 'App/Models/User',
  BillingCycleModel: 'App/Models/BillingCycle',
  BillingCyclesTypeModel: 'App/Models/BillingCyclesType',
  BillingCyclesCategoryModel: 'App/Models/BillingCyclesCategory',
  InvestmentModel: 'App/Models/Investment',
  InvestmentsTypeModel: 'App/Models/InvestmentsType',
  CompanyModel: 'App/Models/Company',
  CompaniesUserModel: 'App/Models/CompaniesUser',
  CountryModel: 'App/Models/Country',
  StateModel: 'App/Models/State',
  CityModel: 'App/Models/City',
  CustomerModel: 'App/Models/Customer',
  CompaniesCustomerModel: 'App/Models/CompaniesCustomer',
};

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = [];

module.exports = { providers, aceProviders, aliases, commands };
