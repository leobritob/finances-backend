'use strict';

const Model = use('Model');

class City extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', ['CityHook.validate']);
  }
}

module.exports = City;
