'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const UserFilter = use('App/ModelFilters/UserFilter');

class User extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['UserHook.validate', 'UserHook.hashPassword']);
    this.addTrait('@provider:Filterable', UserFilter);
  }

  static get traits() {
    return ['@provider:Adonis/Acl/HasRole', '@provider:Adonis/Acl/HasPermission'];
  }

  static get hidden() {
    return ['password'];
  }

  static get computed() {
    return ['full_name'];
  }

  static castDates(field, value) {
    return value.toISOString();
  }

  getFullName({ first_name, last_name }) {
    return `${first_name} ${last_name}`;
  }

  tokens() {
    return this.hasMany('TokenModel');
  }

  companies() {
    return this.belongsToMany('CompanyModel', 'user_id', 'company_id', 'id', 'id').pivotModel('CompaniesUserModel');
  }

  /**
   * Find all users
   * @param {object} ctx
   * @param {number} ctx.page
   * @param {number} ctx.perPage
   * @param {string} ctx.search
   * @returns {QueryBuilder}
   */
  static findAll({ page, perPage, search }) {
    const query = this.query();

    if (search) {
      query.whereRaw(
        `(
          LOWER(users.first_name) LIKE :search
          OR LOWER(users.last_name) LIKE :search
          OR LOWER(users.email) LIKE :search
        )`,
        { search: `%${search.toLowerCase()}%` }
      );
    }

    query.orderBy('id', 'asc');

    if (!perPage) {
      return query.fetch();
    }

    return query.paginate(page, perPage);
  }
}

module.exports = User;
