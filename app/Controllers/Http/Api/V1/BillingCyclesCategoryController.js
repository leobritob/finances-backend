'use strict';

const BillingCyclesCategory = use('BillingCyclesCategoryModel');

class BillingCyclesCategoryController {
  async index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    return BillingCyclesCategory.query()
      .filter(query)
      .paginate(page, 20);
  }

  async store({ request }) {
    return BillingCyclesCategory.create(request.only(['name']));
  }

  async show({ params: { id } }) {
    return BillingCyclesCategory.findOrFail(id);
  }

  async update({ params: { id }, request, response }) {
    const billingCycleCategory = await BillingCyclesCategory.findOrFail(id);
    billingCycleCategory.merge(request.only(['name']));

    const isSave = billingCycleCategory.save();
    if (isSave) return billingCycleCategory;

    return response.status(400).send({
      message: 'Categoria não foi salva porque não houve alteração no cadastro.'
    });
  }

  async destroy({ params: { id }, response }) {
    const billingCycleCategory = await BillingCyclesCategory.findOrFail(id);

    const isDelete = billingCycleCategory.delete();
    if (isDelete) return response.status(204).send();

    return response
      .status(400)
      .send({ message: 'Não foi possível apagar a categoria.' });
  }
}

module.exports = BillingCyclesCategoryController;
