'use strict';

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
}

module.exports = User;
