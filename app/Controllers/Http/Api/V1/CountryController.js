'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('../../../../Models/Country') CountryModel} */

const CountryModel = use('CountryModel');

/**
 * Resourceful controller for interacting with countries
 */
class CountryController {
  /**
   * Show a list of all countries.
   * GET countries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    return CountryModel.query().paginate(page, 20);
  }

  /**
   * Create/save a new country.
   * POST countries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  store({ request }) {
    const data = request.only(['name', 'name_translate', 'initials', 'bacen']);
    return CountryModel.create(data);
  }

  /**
   * Display a single country.
   * GET countries/:id
   *
   * @param {object} ctx
   * @param {object} ctx.params
   */
  show({ params: { id } }) {
    return CountryModel.findOrFail(id);
  }

  /**
   * Update country details.
   * PUT or PATCH countries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    const country = await CountryModel.findOrFail(id);
    country.merge(request.only(['name', 'name_translate', 'initials', 'bacen']));
    if (await country.save()) {
      return country;
    }

    return response.status(400).send({ message: 'Não foi identificado alterações' });
  }

  /**
   * Delete a country with id.
   * DELETE countries/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const country = await CountryModel.findOrFail(id);
    if (await country.delete()) {
      return response.status(204).send();
    }

    return response.status(400).send({ message: 'Houve um erro ao remover o país' });
  }
}

module.exports = CountryController;
