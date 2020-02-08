'use strict';

const Company = use('CompanyModel');
const Database = use('Database');

class CompanyController {
  async index({ request, auth }) {
    const query = request.all();
    const page = query.page || 1;
    const perPage = query.perPage || 20;

    const queryCompaniesUsers = Database.table('companies_users AS cu')
      .select('c.*')
      .innerJoin('companies AS c', 'cu.company_id', 'c.id')
      .where('cu.user_id', auth.user.id);

    if (typeof query === 'object' && query.search) {
      queryCompaniesUsers.whereRaw(
        '(lower(c.fantasy_name) LIKE :search OR lower(c.social_name) LIKE :search OR c.cnpj LIKE :search)',
        { search: `%${query.search.toLowerCase()}%` }
      );
    }

    if (perPage === 'total') {
      return queryCompaniesUsers;
    }

    return queryCompaniesUsers.paginate(page, perPage);
  }

  async store({ request, auth }) {
    const user = await auth.getUser();
    return await user
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

  async show({ params: { id } }) {
    return Company.findOrFail(id);
  }

  async update({ params: { id }, request, response }) {
    const company = await Company.query()
      .where({ id })
      .firstOrFail();

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

    const saveCompany = await company.save();
    if (saveCompany) return company;

    return response.status(400).send({
      message:
        'Não foi atualizado porque não foi identificado mudanças no cadastro.',
    });
  }

  async destroy({ params: { id }, response }) {
    const company = await Company.findOrFail(id);
    const companyDelete = company.delete();
    if (companyDelete) return response.status(204).send();
    return response.send(400).send({
      message: 'Houve um erro ao remover o usuário',
    });
  }
}

module.exports = CompanyController;
