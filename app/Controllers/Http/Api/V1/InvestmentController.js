'use strict';

const Investment = use('InvestmentModel');

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
    return Investment.findOrFail(id);
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

  async destroy({ params: { id } }) {
    const investment = await Investment.findOrFail(id);
    return investment.delete();
  }
}

module.exports = InvestmentController;
