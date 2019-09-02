'use strict';

const Investment = use('InvestmentModel');
const Database = use('Database');
const dateFns = use('date-fns');

class InvestmentController {
  async index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    const perPage = query.perPage || 20;

    const queryInvestments = Database.table('investments AS i')
      .select('i.*')
      .select('it.name AS investments_type_name')
      .select('c.fantasy_name AS company_fantasy_name')
      .innerJoin('investments_types AS it', 'i.investments_type_id', 'it.id')
      .innerJoin('companies AS c', 'i.company_id', 'c.id');

    if (typeof query === 'object' && query) {
      if (query.investments_type_id) {
        queryInvestments.where('i.investments_type_id', query.investments_type_id);
      }

      if (query.company_id) {
        queryInvestments.where('i.company_id', query.company_id);
      }

      if (query.date__gte) {
        queryInvestments.where('i.date', '>=', query.date__gte);
      }

      if (query.date__lte) {
        queryInvestments.where('i.date', '<=', query.date__lte);
      }

      if (query.search) {
        queryInvestments.whereRaw(
          '(lower(i.name) LIKE :search OR lower(i.description) LIKE :search OR lower(it.name) LIKE :search)',
          {
            search: `%${query.search.toLowerCase()}%`
          }
        );
      }
    }

    if (perPage === 'total') {
      return queryInvestments;
    }

    return queryInvestments.paginate(page, perPage);
  }

  async store({ request }) {
    return Investment.create(
      request.only(['investments_type_id', 'name', 'description', 'value', 'date', 'due_date', 'company_id'])
    );
  }

  async show({ params: { id } }) {
    const q = await Database.table('investments AS i')
      .select('i.*')
      .select('it.name AS investments_type_name')
      .select('c.fantasy_name AS company_fantasy_name')
      .innerJoin('investments_types AS it', 'i.investments_type_id', 'it.id')
      .innerJoin('companies AS c', 'i.company_id', 'c.id')
      .where('i.id', id);

    return q[0];
  }

  async update({ params: { id }, request, response }) {
    const investment = await Investment.findOrFail(id);
    investment.merge(
      request.only(['investments_type_id', 'name', 'description', 'value', 'date', 'due_date', 'company_id'])
    );
    const save = await investment.save();
    if (save) return investment;
    return response.status(400).send({
      message: 'Não foi atualizado porque não foi identificado mudanças no cadastro.'
    });
  }

  async destroy({ params: { id }, response }) {
    const investment = await Investment.findOrFail(id);

    const deleteInvestment = investment.delete();
    if (deleteInvestment) return response.status(204).send();

    return response.status(400).send({ message: 'Não foi possível apagar o investimento' });
  }

  async reports() {
    const dateNow = dateFns.format(new Date(), 'yyyy-MM-dd');
    const currentMonth = dateFns.format(dateFns.parse(dateNow, 'yyyy-MM-dd', new Date()), 'MM');
    const lastMonth = currentMonth - 1;

    const result = await Database.raw(
      `
      SELECT
        (SUM(CASE WHEN DATE(date) = :dateNow THEN i.value ELSE 0 END)) as today,
        (SUM(CASE WHEN EXTRACT(MONTH FROM date)::INTEGER = :currentMonth THEN i.value ELSE 0 END)) as current_month,
        (SUM(CASE WHEN EXTRACT(MONTH FROM date)::INTEGER = :lastMonth THEN i.value ELSE 0 END)) as last_month
      FROM investments i
      `,
      { dateNow, currentMonth, lastMonth }
    );

    return result.rows[0];
  }
}

module.exports = InvestmentController;
