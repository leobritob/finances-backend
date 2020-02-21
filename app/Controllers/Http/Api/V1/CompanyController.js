'use strict';

/** @type {typeof import('../../../../Models/Company')} */
const Company = use('CompanyModel');

class CompanyController {
  /**
   * Get all companies
   * @param {object} ctx.request
   * @param {object} ctx.auth
   * GET /companies
   */
  index({ request, auth }) {
    const { page, perPage, search } = request.all();
    return Company.findAll({ page, perPage, search, userId: auth.user.id });
  }

  /**
   * Store a new company
   * @param {object} ctx.request
   * @param {object} ctx.auth
   * POST /companies
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
   * @param {object} ctx.params
   * @param {number} ctx.params.id
   * @param {object} ctx.auth
   * GET /companies/:id
   */
  show({ params: { id }, auth }) {
    return Company.findById({ id, userId: auth.user.id });
  }

  /**
   * Update a company by id
   * @param {object} ctx.params
   * @param {number} ctx.params.id
   * @param {object} ctx.request
   * @param {object} ctx.response
   * @param {object} ctx.auth
   * PUT /companies/:id
   */
  async update({ params: { id }, request, response, auth }) {
    const company = await Company.findById({ id, userId: auth.user.id });

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
   * @param {object} ctx.params
   * @param {number} ctx.params.id
   * @param {object} ctx.response
   * @param {object} ctx.auth
   * DELETE /companies/:id
   */
  async destroy({ params: { id }, response, auth }) {
    const company = await Company.findById({ id, userId: auth.user.id });

    if (await company.delete()) {
      return response.status(204).send();
    }

    return response.send(400).send({ message: 'Houve um erro ao remover o usuário' });
  }
}

module.exports = CompanyController;
