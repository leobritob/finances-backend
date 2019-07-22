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

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = BillingCyclesTypeController;
