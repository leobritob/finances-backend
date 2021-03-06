'use strict';

const BillingCycle = use('BillingCycleModel');
const Database = use('Database');
const dateFns = use('date-fns');

class BillingCycleController {
  async index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    const perPage = query.perPage || 20;

    const queryBillingCycles = Database.table('billing_cycles AS bc')
      .select('bc.*')
      .select('bcc.name AS billing_cycles_category_name')
      .select('c.fantasy_name AS company_fantasy_name')
      .innerJoin('billing_cycles_categories AS bcc', 'bc.billing_cycles_category_id', 'bcc.id')
      .innerJoin('companies AS c', 'bc.company_id', 'c.id');

    if (typeof query === 'object' && query) {
      if (query.billing_cycles_category_id) {
        queryBillingCycles.where('bc.billing_cycles_category_id', query.billing_cycles_category_id);
      }

      if (query.billing_cycles_type_id) {
        queryBillingCycles.where('bcc.billing_cycles_type_id', query.billing_cycles_type_id);
      }

      if (query.company_id) {
        queryBillingCycles.where('bc.company_id', query.company_id);
      }

      if (query.date__gte) {
        queryBillingCycles.where('bc.date', '>=', query.date__gte);
      }

      if (query.date__lte) {
        queryBillingCycles.where('bc.date', '<=', query.date__lte);
      }

      if (query.search) {
        queryBillingCycles.whereRaw('(lower(bc.description) LIKE :search)', {
          search: `%${query.search.toLowerCase()}%`
        });
      }
    }

    if (perPage === 'total') {
      return queryBillingCycles;
    }

    return queryBillingCycles.paginate(page, perPage);
  }

  async store({ request }) {
    return BillingCycle.create(
      request.only(['billing_cycles_category_id', 'value', 'date', 'description', 'company_id'])
    );
  }

  async show({ params: { id } }) {
    const q = await Database.table('billing_cycles AS bc')
      .select('bc.*')
      .select('bcc.name AS billing_cycles_category_name')
      .select('c.fantasy_name AS company_fantasy_name')
      .innerJoin('billing_cycles_categories AS bcc', 'bc.billing_cycles_category_id', 'bcc.id')
      .innerJoin('companies AS c', 'bc.company_id', 'c.id')
      .where('bc.id', id);
    return q[0];
  }

  async update({ params: { id }, request, response }) {
    const billingCycle = await BillingCycle.findOrFail(id);
    billingCycle.merge(request.only(['billing_cycles_category_id', 'value', 'date', 'description', 'company_id']));

    const isSave = billingCycle.save();
    if (isSave) return billingCycle;

    return response.status(400).send({
      message: 'Faturamento não foi salvo porque não houve alteração no cadastro.'
    });
  }

  async destroy({ params: { id }, response }) {
    const billingCycle = await BillingCycle.findOrFail(id);

    const isDelete = billingCycle.delete();
    if (isDelete) return response.status(204).send();

    return response.status(400).send({ message: 'Não foi possível apagar o faturamento.' });
  }

  async reports({ request, response }) {
    let { billing_cycles_type_id } = request.all();

    if (typeof billing_cycles_type_id === 'undefined') {
      return response.status(400).send({ message: 'Informe o tipo do ciclo de faturamento' });
    }

    const dateNow = dateFns.format(new Date(), 'yyyy-MM-dd');
    const currentMonth = dateFns.format(dateFns.parse(dateNow, 'yyyy-MM-dd', new Date()), 'MM');
    const lastMonth = currentMonth - 1;

    const result = await Database.raw(
      `
      SELECT
        (SUM(CASE WHEN DATE(date) = :dateNow THEN bc.value ELSE 0 END)) as today,
        (SUM(CASE WHEN EXTRACT(MONTH FROM date)::INTEGER = :currentMonth THEN bc.value ELSE 0 END)) as current_month,
        (SUM(CASE WHEN EXTRACT(MONTH FROM date)::INTEGER = :lastMonth THEN bc.value ELSE 0 END)) as last_month
      FROM billing_cycles bc
        INNER JOIN billing_cycles_categories bcc ON bc.billing_cycles_category_id = bcc.id
      WHERE bcc.billing_cycles_type_id = :billing_cycles_type_id
      `,
      { dateNow, currentMonth, lastMonth, billing_cycles_type_id }
    );

    return result.rows[0];
  }
}

module.exports = BillingCycleController;
