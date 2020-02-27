'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('../../../../Models/User')} */
const User = use('UserModel');

class UserController {
  /**
   * Get all users
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  index({ request }) {
    const { page, perPage, search } = request.all();
    return User.findAll({ page, perPage, search });
  }

  /**
   * Create an user
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  store({ request }) {
    return User.create(request.only(['first_name', 'last_name', 'email', 'password']));
  }

  /**
   * Show an user
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {number} ctx.params.id
   */
  show({ params: { id } }) {
    return User.findOrFail(id);
  }

  /**
   * Update an user
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {number} ctx.params.id
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    const user = await User.findOrFail(id);
    user.merge(request.only(['first_name', 'last_name', 'email']));

    if (await user.save()) {
      return user;
    }

    return response.status(400).send({ message: 'Nenhuma alteração foi identificada.' });
  }

  /**
   * Delete an user
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {number} ctx.params.id
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const user = await User.findOrFail(id);

    if (await user.delete()) {
      return response.status(204).send();
    }

    return response.status(400).send({ message: 'Houve um erro ao remover o usuário' });
  }
}

module.exports = UserController;
