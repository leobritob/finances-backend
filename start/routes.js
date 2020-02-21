'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => ({ status: 'OK' }));

Route.group(function() {
  // Authentication
  Route.post('auth/token', 'Api/AuthController.token');
  Route.get('auth/me', 'Api/AuthController.me');
}).prefix('api');

Route.group(function() {
  // Dashboard
  Route.get('dashboard-general', 'Api/V1/DashboardController.general').middleware(['auth']);
  Route.get('dashboard-general-with-months', 'Api/V1/DashboardController.generalWithMonths').middleware(['auth']);
  Route.get('dashboard-general-investments', 'Api/V1/DashboardController.generalInvestments').middleware(['auth']);
  Route.get('dashboard-general-pdf', 'Api/V1/DashboardController.generalPdf').middleware(['auth']);

  // Companies
  Route.get('companies', 'Api/V1/CompanyController.index').middleware(['auth']);
  Route.post('companies', 'Api/V1/CompanyController.store');
  Route.get('companies/:id', 'Api/V1/CompanyController.show').middleware(['auth']);
  Route.put('companies/:id', 'Api/V1/CompanyController.update').middleware(['auth']);
  Route.delete('companies/:id', 'Api/V1/CompanyController.destroy').middleware(['auth']);

  // Companies Users
  Route.get('companies-users', 'Api/V1/CompaniesUserController.index').middleware(['auth']);
  Route.post('companies-users', 'Api/V1/CompaniesUserController.store');
  Route.get('companies-users/:id', 'Api/V1/CompaniesUserController.show').middleware(['auth']);
  Route.put('companies-users/:id', 'Api/V1/CompaniesUserController.update').middleware(['auth']);
  Route.delete('companies-users/:id', 'Api/V1/CompaniesUserController.destroy').middleware(['auth']);

  // Users
  Route.get('users', 'Api/V1/UserController.index').middleware(['auth']);
  Route.post('users', 'Api/V1/UserController.store');
  Route.get('users/:id', 'Api/V1/UserController.show').middleware(['auth']);
  Route.put('users/:id', 'Api/V1/UserController.update').middleware(['auth']);
  Route.delete('users/:id', 'Api/V1/UserController.destroy').middleware(['auth']);

  // BillingCycles
  Route.get('billing-cycles', 'Api/V1/BillingCycleController.index').middleware(['auth']);
  Route.post('billing-cycles', 'Api/V1/BillingCycleController.store').middleware(['auth']);
  Route.get('billing-cycles/:id', 'Api/V1/BillingCycleController.show').middleware(['auth']);
  Route.put('billing-cycles/:id', 'Api/V1/BillingCycleController.update').middleware(['auth']);
  Route.delete('billing-cycles/:id', 'Api/V1/BillingCycleController.destroy').middleware(['auth']);

  // BillingCycles Reports
  Route.get('billing-cycles-reports', 'Api/V1/BillingCycleController.reports').middleware(['auth']);

  // BillingCyclesTypes
  Route.get('billing-cycles-types', 'Api/V1/BillingCyclesTypeController.index').middleware(['auth']);
  Route.post('billing-cycles-types', 'Api/V1/BillingCyclesTypeController.store').middleware(['auth']);
  Route.get('billing-cycles-types/:id', 'Api/V1/BillingCyclesTypeController.show').middleware(['auth']);
  Route.put('billing-cycles-types/:id', 'Api/V1/BillingCyclesTypeController.update').middleware(['auth']);
  Route.delete('billing-cycles-types/:id', 'Api/V1/BillingCyclesTypeController.destroy').middleware(['auth']);

  // BillingCyclesTypes
  Route.get('billing-cycles-categories', 'Api/V1/BillingCyclesCategoryController.index').middleware(['auth']);
  Route.post('billing-cycles-categories', 'Api/V1/BillingCyclesCategoryController.store').middleware(['auth']);
  Route.get('billing-cycles-categories/:id', 'Api/V1/BillingCyclesCategoryController.show').middleware(['auth']);
  Route.put('billing-cycles-categories/:id', 'Api/V1/BillingCyclesCategoryController.update').middleware(['auth']);
  Route.delete('billing-cycles-categories/:id', 'Api/V1/BillingCyclesCategoryController.destroy').middleware(['auth']);

  // Investments
  Route.get('investments', 'Api/V1/InvestmentController.index').middleware(['auth']);
  Route.post('investments', 'Api/V1/InvestmentController.store').middleware(['auth']);
  Route.get('investments/:id', 'Api/V1/InvestmentController.show').middleware(['auth']);
  Route.put('investments/:id', 'Api/V1/InvestmentController.update').middleware(['auth']);
  Route.delete('investments/:id', 'Api/V1/InvestmentController.destroy').middleware(['auth']);

  // Investments Reports
  Route.get('investments-reports', 'Api/V1/InvestmentController.reports');

  // Investments Types
  Route.get('investments-types', 'Api/V1/InvestmentsTypeController.index').middleware(['auth']);
  Route.post('investments-types', 'Api/V1/InvestmentsTypeController.store').middleware(['auth']);
  Route.get('investments-types/:id', 'Api/V1/InvestmentsTypeController.show').middleware(['auth']);
  Route.put('investments-types/:id', 'Api/V1/InvestmentsTypeController.update').middleware(['auth']);
  Route.delete('investments-types/:id', 'Api/V1/InvestmentsTypeController.destroy').middleware(['auth']);

  // Countries
  Route.get('countries', 'Api/V1/CountryController.index').middleware(['auth']);
  Route.post('countries', 'Api/V1/CountryController.store').middleware(['auth']);
  Route.get('countries/:id', 'Api/V1/CountryController.show').middleware(['auth']);
  Route.put('countries/:id', 'Api/V1/CountryController.update').middleware(['auth']);
  Route.delete('countries/:id', 'Api/V1/CountryController.destroy').middleware(['auth']);

  Route.get('customers', 'Api/V1/CustomerController.index').middleware(['auth']);
  Route.post('customers', 'Api/V1/CustomerController.store').middleware(['auth']);
}).prefix('api/v1');
