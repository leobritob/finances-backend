'use strict';

const BillingCycles = use('BillingCyclesModel');

class BillingCycleController {
  async index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    return BillingCycles.query()
      .filter(query)
      .paginate(page, 20);
  }

  async store({ request }) {
    return BillingCycles.create(
      request.only(['billing_cycles_type_id', 'value', 'description'])
    );
  }

  async show({ params, request, response }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = BillingCycleController;
