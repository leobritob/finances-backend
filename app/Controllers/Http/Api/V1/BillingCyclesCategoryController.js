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

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = BillingCyclesCategoryController;
