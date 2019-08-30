'use strict';

const Company = use('CompanyModel');

class CompanyController {
  async index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    return Company.query()
      .filter(query)
      .orderBy('id', 'asc')
      .paginate(page, 20);
  }

  async store({ request }) {
    return Company.create(
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
        'logo'
      ])
    );
  }

  async show({ params: { id } }) {
    return Company.findOrFail(id);
  }

  async update({ params: { id }, request, response }) {
    const company = await Company.findOrFail(id);
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
        'logo'
      ])
    );
    const save = await company.save();
    if (save) return company;
    return response.status(400).send({
      message: 'Não foi atualizado porque não foi identificado mudanças no cadastro.'
    });
  }

  async destroy({ params: { id }, response }) {
    const company = await Company.findOrFail(id);
    const companyDelete = company.delete();
    if (companyDelete) return response.status(204).send();
    return response.send(400).send({
      message: 'Houve um erro ao remover o usuário'
    });
  }
}

module.exports = CompanyController;
