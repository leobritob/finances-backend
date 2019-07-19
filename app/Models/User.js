'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const UserFilter = use('App/ModelFilters/UserFilter');

class User extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['UserHook.validate', 'UserHook.hashPassword']);
    this.addTrait('@provider:Filterable', UserFilter);
  }

  static get traits() {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ];
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

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token');
  }
}

module.exports = User;
