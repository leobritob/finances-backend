'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const CustomerModel = use('CustomerModel');

/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    return CustomerModel.query().paginate(page, 20);
  }

  /**
   * Render a form to be used for creating a new customer.
   * GET customers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  store({ request }) {
    return CustomerModel.create(
      request.only([
        'first_name',
        'last_name',
        'birthday_date',
        'gender',
        'profession',
        'cellphone',
        'phone',
        'cpf',
        'rg',
        'street_name',
        'street_number',
        'district',
        'zipcode',
        'city_id',
        'state_id',
        'country_id',
      ])
    );
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {}

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = CustomerController;
