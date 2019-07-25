'use strict';

const BillingCycle = use('BillingCycleModel');

class BillingCycleController {
  async index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    return BillingCycle.query()
      .filter(query)
      .paginate(page, 20);
  }

  async store({ request }) {
    return BillingCycle.create(
      request.only([
        'billing_cycles_type_id',
        'billing_cycles_category_id',
        'value',
        'description'
      ])
    );
  }

  async show({ params: { id } }) {
    return BillingCycle.findOrFail(id);
  }

  async update({ params: { id }, request, response }) {
    const billingCycle = await BillingCycle.findOrFail(id);
    billingCycle.merge(
      request.only([
        'billing_cycles_type_id',
        'billing_cycles_category_id',
        'value',
        'description'
      ])
    );

    const isSave = billingCycle.save();
    if (isSave) return billingCycle;

    return response.status(400).send({
      message:
        'Faturamento não foi salvo porque não houve alteração no cadastro.'
    });
  }

  async destroy({ params: { id }, response }) {
    const billingCycle = await BillingCycle.findOrFail(id);

    const isDelete = billingCycle.delete();
    if (isDelete) return response.status(204).send();

    return response
      .status(400)
      .send({ message: 'Não foi possível apagar o faturamento.' });
  }
}

module.exports = BillingCycleController;
