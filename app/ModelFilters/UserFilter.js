'use strict';

const ModelFilter = use('ModelFilter');

class UserFilter extends ModelFilter {
  id(id) {
    return this.where('id', id);
  }

  firstName(first_name) {
    first_name = first_name.toLowerCase();
    return this.whereRaw('(lower("first_name") LIKE ?)', [`%${first_name}%`]);
  }

  lastName(last_name) {
    last_name = last_name.toLowerCase();
    return this.whereRaw('(lower("last_name") LIKE ?)', [`%${last_name}%`]);
  }

  email(email) {
    email = email.toLowerCase();
    return this.whereRaw('(lower("email") LIKE ?)', [`%${email}%`]);
  }

  search(search) {
    search = search.toLowerCase();
    return this.whereRaw(
      '(lower(first_name) LIKE ? OR lower(last_name) LIKE ? OR lower(email) LIKE ?)',
      [`%${search}%`, `%${search}%`, `%${search}%`]
    );
  }
}

module.exports = UserFilter;
