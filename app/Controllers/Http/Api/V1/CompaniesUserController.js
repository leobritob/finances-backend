'use strict';

const CompaniesUser = use('CompaniesUserModel');

class CompaniesUserController {
  async index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    return CompaniesUser.query()
      .filter(query)
      .orderBy('id', 'asc')
      .paginate(page, 20);
  }

  async store({ request }) {
    return CompaniesUser.create(request.only(['company_id', 'user_id']));
  }

  async show({ params: { id } }) {
    return CompaniesUser.findOrFail(id);
  }

  async update({ params: { id }, request, response }) {
    const company = await CompaniesUser.findOrFail(id);
    company.merge(request.only(['company_id', 'user_id']));
    const save = await company.save();
    if (save) return company;
    return response.status(400).send({
      message: 'Não foi atualizado porque não foi identificado mudanças no cadastro.'
    });
  }

  async destroy({ params: { id }, response }) {
    const company = await CompaniesUser.findOrFail(id);
    const companyDelete = company.delete();
    if (companyDelete) return response.status(204).send();
    return response.send(400).send({
      message: 'Houve um erro ao remover o usuário'
    });
  }
}

module.exports = CompaniesUserController;
