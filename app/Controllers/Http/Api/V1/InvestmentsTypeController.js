'use strict';

const InvestmentsType = use('InvestmentsTypeModel');

class InvestmentsTypeController {
  async index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    return InvestmentsType.query()
      .filter(query)
      .orderBy('id', 'asc')
      .paginate(page, 20);
  }

  async store({ request }) {
    return InvestmentsType.create(request.only(['name', 'description', 'color', 'risk']));
  }

  async show({ params: { id } }) {
    return InvestmentsType.findOrFail(id);
  }

  async update({ params: { id }, request, response }) {
    const investment = await InvestmentsType.findOrFail(id);
    investment.merge(request.only(['name', 'description', 'color', 'risk']));

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
