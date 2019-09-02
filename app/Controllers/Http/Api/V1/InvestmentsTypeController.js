'use strict';

const InvestmentsType = use('InvestmentsTypeModel');
const Database = use('Database');

class InvestmentsTypeController {
  async index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    const perPage = query.perPage || 20;

    const queryInvestmentsTypes = Database.table('investments_types AS it')
      .select('it.*')
      .select(
        Database.raw(`
        (
          CASE
            WHEN it.risk = 1 THEN 'Baixo'
            WHEN it.risk = 2 THEN 'Moderado'
            WHEN it.risk = 3 THEN 'Alto'
          END
        ) AS risk_label
      `)
      )
      .select('c.fantasy_name AS company_fantasy_name')
      .innerJoin('companies AS c', 'it.company_id', 'c.id');

    if (typeof query === 'object' && query) {
      if (query.company_id) {
        queryInvestmentsTypes.where('it.company_id', query.company_id);
      }

      if (query.search) {
        queryInvestmentsTypes.whereRaw('(lower(it.name) LIKE :search OR lower(it.description) LIKE :search)', {
          search: `%${query.search.toLowerCase()}%`
        });
      }
    }

    if (perPage === 'total') {
      return queryInvestmentsTypes;
    }

    return queryInvestmentsTypes.paginate(page, perPage);
  }

  async store({ request }) {
    return InvestmentsType.create(request.only(['name', 'description', 'color', 'risk', 'company_id']));
  }

  async show({ params: { id } }) {
    const q = await Database.table('investments_types AS it')
      .select('it.*')
      .select(
        Database.raw(`
        (
          CASE
            WHEN it.risk = 1 THEN 'Baixo'
            WHEN it.risk = 2 THEN 'Moderado'
            WHEN it.risk = 3 THEN 'Alto'
          END
        ) AS risk_label
      `)
      )
      .select('c.fantasy_name AS company_fantasy_name')
      .innerJoin('companies AS c', 'it.company_id', 'c.id')
      .where('it.id', id);
    return q[0];
  }

  async update({ params: { id }, request, response }) {
    const investment = await InvestmentsType.findOrFail(id);
    investment.merge(request.only(['name', 'description', 'color', 'risk', 'company_id']));

    const save = await investment.save();
    if (save) return investment;

    return response.status(400).send({
      message: 'Não foi atualizado porque não foi identificado mudanças no cadastro.'
    });
  }

  async destroy({ params: { id }, response }) {
    const investment = await InvestmentsType.findOrFail(id);

    const investmentDeleted = investment.delete();
    if (investmentDeleted) return response.status(204).send();

    return response.status(400).send({ message: 'Não foi possível apagar o tipo de investimento' });
  }
}

module.exports = InvestmentsTypeController;
