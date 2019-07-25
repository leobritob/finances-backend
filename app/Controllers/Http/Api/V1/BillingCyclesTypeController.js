'use strict';

const BillingCyclesType = use('BillingCyclesTypeModel');

class BillingCyclesTypeController {
  async index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    return BillingCyclesType.query()
      .filter(query)
      .paginate(page, 20);
  }

  async store({ request }) {
    return BillingCyclesType.create(request.only(['name', 'description']));
  }

  async show({ params: { id } }) {
    return BillingCyclesType.findOrFail(id);
  }

  async update({ params: { id }, request, response }) {
    const billingCycleCategory = await BillingCyclesType.findOrFail(id);
    billingCycleCategory.merge(request.only(['name', 'description']));

    const isSave = billingCycleCategory.save();
    if (isSave) return billingCycleCategory;

    return response.status(400).send({
      message: 'Tipo não foi salvo porque não houve alteração no cadastro.'
    });
  }

  async destroy({ params: { id }, response }) {
    const billingCycleCategory = await BillingCyclesType.findOrFail(id);

    const isDelete = billingCycleCategory.delete();
    if (isDelete) return response.status(204).send();

    return response
      .status(400)
      .send({ message: 'Não foi possível apagar o tipo.' });
  }
}

module.exports = BillingCyclesTypeController;
