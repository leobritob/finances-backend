'use strict';

const Investment = use('InvestmentModel');
const Database = use('Database');
const dateFns = use('date-fns');

class InvestmentController {
  async index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    return Investment.query()
      .filter(query)
      .orderBy('id', 'asc')
      .paginate(page, 20);
  }

  async store({ request }) {
    return Investment.create(request.only(['investments_type_id', 'name', 'description', 'value', 'date', 'due_date']));
  }

  async show({ params: { id } }) {
    return Investment.query()
      .with('investmentsType')
      .where('id', id)
      .firstOrFail();
  }

  async update({ params: { id }, request, response }) {
    const investment = await Investment.findOrFail(id);
    investment.merge(request.only(['investments_type_id', 'name', 'description', 'value', 'date', 'due_date']));
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
        (SUM(CASE WHEN DATE(date) = ? THEN i.value ELSE 0 END)) as today,
        (SUM(CASE WHEN EXTRACT(MONTH FROM date)::INTEGER = ? THEN i.value ELSE 0 END)) as current_month,
        (SUM(CASE WHEN EXTRACT(MONTH FROM date)::INTEGER = ? THEN i.value ELSE 0 END)) as last_month
      FROM investments i
      `,
      [dateNow, currentMonth, lastMonth]
    );

    return result.rows[0];
  }
}

module.exports = InvestmentController;
