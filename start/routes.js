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
}).prefix('api');

Route.group(function() {
  // Users
  Route.get('users', 'Api/V1/UserController.index').middleware(['auth']);
  Route.post('users', 'Api/V1/UserController.store').middleware(['auth']);
  Route.get('users/:id', 'Api/V1/UserController.show').middleware(['auth']);
  Route.put('users/:id', 'Api/V1/UserController.update').middleware(['auth']);
  Route.delete('users/:id', 'Api/V1/UserController.destroy').middleware([
    'auth'
  ]);

  // BillingCycles
  Route.get('billing-cycles', 'Api/V1/BillingCycleController.index').middleware(
    ['auth']
  );
  Route.post(
    'billing-cycles',
    'Api/V1/BillingCycleController.store'
  ).middleware(['auth']);
  Route.get(
    'billing-cycles/:id',
    'Api/V1/BillingCycleController.show'
  ).middleware(['auth']);
  Route.put(
    'billing-cycles/:id',
    'Api/V1/BillingCycleController.update'
  ).middleware(['auth']);
  Route.delete(
    'billing-cycles/:id',
    'Api/V1/BillingCycleController.destroy'
  ).middleware(['auth']);

  // BillingCyclesTypes
  Route.get(
    'billing-cycles-types',
    'Api/V1/BillingCyclesTypeController.index'
  ).middleware(['auth']);
  Route.post(
    'billing-cycles-types',
    'Api/V1/BillingCyclesTypeController.store'
  ).middleware(['auth']);
  Route.get(
    'billing-cycles-types/:id',
    'Api/V1/BillingCyclesTypeController.show'
  ).middleware(['auth']);
  Route.put(
    'billing-cycles-types/:id',
    'Api/V1/BillingCyclesTypeController.update'
  ).middleware(['auth']);
  Route.delete(
    'billing-cycles-types/:id',
    'Api/V1/BillingCyclesTypeController.destroy'
  ).middleware(['auth']);

  // BillingCyclesTypes
  Route.get(
    'billing-cycles-categories',
    'Api/V1/BillingCyclesCategoryController.index'
  ).middleware(['auth']);
  Route.post(
    'billing-cycles-categories',
    'Api/V1/BillingCyclesCategoryController.store'
  ).middleware(['auth']);
  Route.get(
    'billing-cycles-categories/:id',
    'Api/V1/BillingCyclesCategoryController.show'
  ).middleware(['auth']);
  Route.put(
    'billing-cycles-categories/:id',
    'Api/V1/BillingCyclesCategoryController.update'
  ).middleware(['auth']);
  Route.delete(
    'billing-cycles-categories/:id',
    'Api/V1/BillingCyclesCategoryController.destroy'
  ).middleware(['auth']);
}).prefix('api/v1');
