'use strict';

/** @type {typeof import('../../../../Models/Company')} */
const CompanyModel = use('CompanyModel');

class CompanyController {
  /**
   * Get all companies
   * GET /api/v1/companies
   *
   * @param {Object} ctx.request
   * @param {Object} ctx.auth
   */
  index({ request, auth }) {
    const { page, perPage, search } = request.all();
    return CompanyModel.findAll({ page, perPage, search, userId: auth.user.id });
  }

  /**
   * Store a new company
   * POST /api/v1/companies
   *
   * @param {Object} ctx.request
   * @param {Object} ctx.auth
   */
  async store({ request, auth }) {
    const user = await auth.getUser();
    return user
      .companies()
      .create(
        request.only([
          'social_name',
          'fantasy_name',
          'cnpj',
          'email',
          'cellphone',
          'telephone',
          'street_name',
          'street_number',
          'district',
          'city',
          'uf',
          'country',
          'logo',
        ])
      );
  }

  /**
   * Get company by id
   * GET /api/v1/companies/:id
   *
   * @param {Object} ctx.params
   * @param {number} ctx.params.id
   * @param {Object} ctx.auth
   */
  show({ params: { id }, auth }) {
    return CompanyModel.findByIdOrFail({ id, userId: auth.user.id });
  }

  /**
   * Update a company by id
   * PUT /api/v1/companies/:id
   *
   * @param {Object} ctx.params
   * @param {number} ctx.params.id
   * @param {Object} ctx.request
   * @param {Object} ctx.response
   * @param {Object} ctx.auth
   */
  async update({ params: { id }, request, response, auth }) {
    const company = await CompanyModel.findByIdOrFail({ id, userId: auth.user.id });

    company.merge(
      request.only([
        'social_name',
        'fantasy_name',
        'cnpj',
        'email',
        'cellphone',
        'telephone',
        'street_name',
        'street_number',
        'district',
        'city',
        'uf',
        'country',
        'logo',
      ])
    );

    if (await company.save()) {
      return company;
    }

    return response.status(400).send({ message: 'Nenhuma mudança foi identificada no cadastro.' });
  }

  /**
   * Delete a company by id
   * DELETE /api/v1/companies/:id
   *
   * @param {Object} ctx.params
   * @param {number} ctx.params.id
   * @param {Object} ctx.response
   * @param {Object} ctx.auth
   */
  async destroy({ params: { id }, response, auth }) {
    const company = await CompanyModel.findByIdOrFail({ id, userId: auth.user.id });

    if (await company.delete()) {
      return response.status(204).send();
    }

    return response.send(400).send({ message: 'Houve um erro ao remover o usuário' });
  }
}

module.exports = CompanyController;
