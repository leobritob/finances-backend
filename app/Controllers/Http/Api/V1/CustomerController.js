'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('../../../../Models/Customer')} */
const CustomerModel = use('CustomerModel');
/** @type {typeof import('../../../../Models/Company')} */
const CompanyModel = use('CompanyModel');

/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET /api/v1/customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {object} ctx.auth
   */
  index({ request, auth }) {
    const { page, perPage, search } = request.all();
    return CustomerModel.findAll({ page, perPage, search, userId: auth.user.id });
  }

  /**
   * Store a new customer
   * POST /api/v1/customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {object} ctx.auth
   */
  async store({ params: { company_id }, request, auth }) {
    const company = await CompanyModel.findByIdOrFail({ id: company_id, userId: auth.user.id });

    const data = request.only([
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
    ]);

    return company.customers().create(data);
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.auth
   */
  async update({ params: { id }, request, response, auth }) {
    const customer = await CustomerModel.findByIdOrFail({ id, userId: auth.user.id });

    customer.merge(
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

    if (await customer.save()) {
      return customer;
    }

    return response.status(400).send({ message: 'Nenhuma alteração foi identificada.' });
  }

  /**
   * Get a customer by id
   * PUT api/v1/customers/:id
   *
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {number} ctx.params.id
   * @param {object} ctx.auth
   */
  show({ params: { id }, auth }) {
    return CustomerModel.findByIdOrFail({ id, userId: auth.user.id });
  }

  /**
   * Delete a customer with id.
   * DELETE api/v1/customers/:id
   *
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {number} ctx.params.id
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response, auth }) {
    const customer = await CustomerModel.findByIdOrFail({ id, userId: auth.user.id });
    if (await customer.delete()) {
      return response.status(204).send();
    }

    return response.status(400).send({ message: 'Não foi possível remover o cliente.' });
  }
}

module.exports = CustomerController;
