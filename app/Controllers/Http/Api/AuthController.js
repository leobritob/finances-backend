'use strict';

class AuthController {
  async token({ request, response }) {}

  async forgotPassword({ request, response }) {}

  async me({ request, auth }) {}
}

module.exports = AuthController;
