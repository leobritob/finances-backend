'use strict';

/** @typedef {import('@adonisjs/lucid/src/Lucid/QueryBuilder')} QueryBuilder */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
/** @type {typeof import('@adonisjs/lucid/src/Database')} */
const Database = use('Database');

class Customer extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['CustomerHook.validate']);
  }

  static castDates(field, value) {
    return value.toISOString();
  }

  /**
   * Get a customer by id
   * @param {object} ctx
   * @param {number} ctx.id
   * @param {number} ctx.userId
   * @returns {QueryBuilder}
   */
  static findByIdOrFail({ id, userId }) {
    return this.findAllByUserId(userId)
      .where('customers.id', id)
      .firstOrFail();
  }

  /**
   * Get all customers by all companies of userId
   * @param {number} userId id of user
   * @returns {QueryBuilder}
   */
  static findAllByUserId(userId) {
    const companiesOfUser = Database.table('companies_users')
      .select('company_id')
      .where('user_id', userId);

    return this.query()
      .select('customers.*')
      .select('c.name_translate AS country_name')
      .select('s.name AS state_name')
      .select('ci.name AS city_name')
      .innerJoin('companies_customers AS cc', 'cc.customer_id', 'customers.id')
      .leftJoin('countries AS c', 'customers.country_id', 'c.id')
      .leftJoin('states AS s', 'customers.state_id', 's.id')
      .leftJoin('cities AS ci', 'customers.city_id', 'ci.id')
      .whereIn('cc.company_id', companiesOfUser);
  }

  /**
   * Find all customers
   * @param {object} ctx
   * @param {number} ctx.page
   * @param {number} ctx.perPage
   * @param {string} ctx.search
   * @param {number} ctx.userId
   * @returns {QueryBuilder}
   */
  static findAll({ page, perPage, search, userId }) {
    const query = this.findAllByUserId(userId);

    if (search) {
      query.whereRaw(
        `(
            LOWER(customers.first_name) LIKE :search
            OR LOWER(customers.last_name) LIKE :search
            OR LOWER(customers.cpf) LIKE :search
            OR LOWER(customers.cellphone) LIKE :search
          )`,
        { search: `%${search.toLowerCase()}%` }
      );
    }

    if (!perPage) {
      return query.fetch();
    }

    return query.paginate(page, perPage);
  }
}

module.exports = Customer;
