'use strict';

const User = use('UserModel');
const Hash = use('Hash');

class AuthController {
  async token({ request, response, auth }) {
    const { email, password } = request.all();
    const user = await User.findBy({ email });
    if (user) {
      const isAuth = await Hash.verify(password, user.password);
      if (isAuth) {
        return await auth.withRefreshToken().generate(user);
      } else {
        return response.status(400).send({ message: 'Senha inválida' });
      }
    }
    return response.status(400).send({ message: 'E-mail inválido' });
  }

  async forgotPassword() {}

  async me({ auth }) {
    const { id } = await auth.getUser();
    return User.findOrFail(id);
  }
}

module.exports = AuthController;
