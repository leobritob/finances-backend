'use strict';

/** @typedef {import('@adonisjs/lucid/src/Lucid/QueryBuilder')} QueryBuilder */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const CompaniesFilter = use('App/ModelFilters/CompaniesFilter');

class Company extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['CompanyHook.validate']);
    this.addTrait('@provider:Filterable', CompaniesFilter);
  }

  static castDates(field, value) {
    return value.toISOString();
  }

  users() {
    return this.belongsToMany('UserModel').pivotModel('CompaniesUserModel');
  }

  customers() {
    return this.belongsToMany('CustomerModel').pivotModel('CompaniesCustomerModel');
  }

  billingCyclesCategories() {
    return this.hasMany('BillingCyclesCategoryModel');
  }

  billingCycles() {
    return this.hasMany('BillingCycleModel');
  }

  investments() {
    return this.hasMany('InvestmentModel');
  }

  investmentsTypes() {
    return this.hasMany('InvestmentsTypeModel');
  }

  /**
   * Get all companies
   * @param {number} ctx.page
   * @param {number | null} ctx.perPage
   * @param {string} ctx.search
   * @param {number} ctx.userId
   */
  static findAll({ page = 1, perPage, search, userId }) {
    const queryCompaniesUsers = this.query()
      .select('companies.*')
      .innerJoin('companies_users AS cu', 'cu.company_id', 'companies.id')
      .where('cu.user_id', userId);

    if (search) {
      queryCompaniesUsers.whereRaw(
        '(lower(companies.fantasy_name) LIKE :search OR lower(companies.social_name) LIKE :search OR companies.cnpj LIKE :search)',
        { search: `%${search.toLowerCase()}%` }
      );
    }

    if (!perPage) {
      return queryCompaniesUsers.fetch();
    }

    return queryCompaniesUsers.paginate(page, perPage);
  }

  /**
   * Get company by id
   * @param {number} ctx.id - id of company
   * @param {number} ctx.userId - id of user
   * @returns {Object} company details
   */
  static findByIdOrFail({ id, userId }) {
    const query = this.query()
      .innerJoin('companies_users AS cu', 'cu.company_id', 'companies.id')
      .where('cu.user_id', userId)
      .where('cu.company_id', id);
    return query.firstOrFail();
  }
}

module.exports = Company;
