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

Route.get('/', () => ({ greeting: 'Hello world in JSON' }));

Route.group(function() {
  Route.get('/', () => ({ hello: 'api' }));

  // Authentication
  Route.post('auth/token', 'Api/AuthController.token');
}).prefix('api');

Route.group(function() {
  Route.get('/', () => ({ hello: 'api/v1' }));

  // Users
  Route.get('users', 'Api/V1/UserController.index');
  Route.post('users', 'Api/V1/UserController.store');
  Route.get('users/:id', 'Api/V1/UserController.show');
  Route.put('users/:id', 'Api/V1/UserController.update');
  Route.delete('users/:id', 'Api/V1/UserController.destroy');

  // BillingCycles
  Route.get('billing-cycles', 'Api/V1/BillingCycleController.index');
  Route.post('billing-cycles', 'Api/V1/BillingCycleController.store');
  Route.get('billing-cycles/:id', 'Api/V1/BillingCycleController.show');
  Route.put('billing-cycles/:id', 'Api/V1/BillingCycleController.update');
  Route.delete('billing-cycles/:id', 'Api/V1/BillingCycleController.destroy');

  // BillingCyclesTypes
  Route.get('billing-cycles-types', 'Api/V1/BillingCyclesTypeController.index');
  Route.post(
    'billing-cycles-types',
    'Api/V1/BillingCyclesTypeController.store'
  );
  Route.get(
    'billing-cycles-types/:id',
    'Api/V1/BillingCyclesTypeController.show'
  );
  Route.put(
    'billing-cycles-types/:id',
    'Api/V1/BillingCyclesTypeController.update'
  );
  Route.delete(
    'billing-cycles-types/:id',
    'Api/V1/BillingCyclesTypeController.destroy'
  );
}).prefix('api/v1');
