'use strict';

const User = use('UserModel');

class UserController {
  async index({ request }) {
    const query = request.all();
    let page = query.page || 1;
    return User.query().paginate(page, 20);
  }

  async store({ request }) {
    return User.create(
      request.only(['first_name', 'last_name', 'email', 'password'])
    );
  }

  async show({ params: { id } }) {
    return User.findOrFail(id);
  }

  async update({ params: { id }, request, response }) {
    const user = await User.findOrFail(id);
    user.merge(request.only(['first_name', 'last_name', 'email']));
    const save = await user.save();
    if (save) return user;
    return response.status(400).send({
      message:
        'Não foi atualizado porque não foi identificado mudanças no cadastro.'
    });
  }

  async destroy({ params: { id } }) {
    const user = await User.findOrFail(id);
    return user.delete();
  }
}

module.exports = UserController;
