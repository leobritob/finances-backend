'use strict';

const BillingCycle = use('BillingCycleModel');
const Database = use('Database');
const dateFns = use('date-fns');

class BillingCycleController {
  async index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    return BillingCycle.query()
      .with('billingCyclesCategory')
      .filter(query)
      .orderBy('id', 'asc')
      .paginate(page, 20);
  }

  async store({ request }) {
    return BillingCycle.create(request.only(['billing_cycles_category_id', 'value', 'date', 'description']));
  }

  async show({ params: { id } }) {
    return BillingCycle.query()
      .with('billingCyclesCategory')
      .where('id', id)
      .firstOrFail();
  }

  async update({ params: { id }, request, response }) {
    const billingCycle = await BillingCycle.findOrFail(id);
    billingCycle.merge(request.only(['billing_cycles_category_id', 'value', 'date', 'description']));

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
        (SUM(CASE WHEN DATE(date) = ? THEN bc.value ELSE 0 END)) as today,
        (SUM(CASE WHEN EXTRACT(MONTH FROM date)::INTEGER = ? THEN bc.value ELSE 0 END)) as current_month,
        (SUM(CASE WHEN EXTRACT(MONTH FROM date)::INTEGER = ? THEN bc.value ELSE 0 END)) as last_month
      FROM billing_cycles bc
        INNER JOIN billing_cycles_categories bcc ON bc.billing_cycles_category_id = bcc.id
      WHERE bcc.billing_cycles_type_id = ?
      `,
      [dateNow, currentMonth, lastMonth, billing_cycles_type_id]
    );

    return result.rows[0];
  }

  async generalReports({ request, response }) {}
}

module.exports = BillingCycleController;
