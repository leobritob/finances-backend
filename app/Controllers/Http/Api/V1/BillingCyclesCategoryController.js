'use strict';

const BillingCyclesCategory = use('BillingCyclesCategoryModel');
const Database = use('Database');

class BillingCyclesCategoryController {
  async index({ request }) {
    const query = request.all();
    const page = query.page || 1;
    const perPage = query.perPage || 20;

    const queryInvestments = Database.table('billing_cycles_categories AS bcc')
      .select('bcc.*')
      .select('bct.name AS billing_cycles_type_name')
      .select('c.fantasy_name AS company_fantasy_name')
      .innerJoin('billing_cycles_types AS bct', 'bcc.billing_cycles_type_id', 'bct.id')
      .innerJoin('companies AS c', 'bcc.company_id', 'c.id');

    if (typeof query === 'object' && query.search) {
      queryInvestments.whereRaw('(lower(bcc.name) LIKE :search OR lower(bct.name) LIKE :search)', {
        search: `%${query.search.toLowerCase()}%`
      });
    }

    if (perPage === 'total') {
      return queryInvestments;
    }

    return queryInvestments.paginate(page, perPage);
  }

  async store({ request }) {
    return BillingCyclesCategory.create(request.only(['company_id', 'billing_cycles_type_id', 'name']));
  }

  async show({ params: { id } }) {
    const q = await Database.table('billing_cycles_categories AS bcc')
      .select('bcc.*')
      .select('bct.name AS billing_cycles_type_name')
      .select('c.fantasy_name AS company_fantasy_name')
      .innerJoin('billing_cycles_types AS bct', 'bcc.billing_cycles_type_id', 'bct.id')
      .innerJoin('companies AS c', 'bcc.company_id', 'c.id')
      .where('bcc.id', id);
    return q[0];
  }

  async update({ params: { id }, request, response }) {
    const billingCycleCategory = await BillingCyclesCategory.findOrFail(id);
    billingCycleCategory.merge(request.only(['company_id', 'billing_cycles_type_id', 'name']));

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

    return response.status(400).send({ message: 'Não foi possível apagar a categoria.' });
  }
}

module.exports = BillingCyclesCategoryController;
