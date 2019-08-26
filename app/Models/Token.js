'use strict';

const Model = use('Model');

class Token extends Model {
  static boot() {
    super.boot();
  }

  user() {
    return this.belongsTo('UserModel');
  }
}

module.exports = Token;
