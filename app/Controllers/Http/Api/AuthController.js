'use strict';

const User = use('UserModel');
const Hash = use('Hash');

class AuthController {
  async token({ request, response, auth }) {
    const { email, password } = request.all();

    if (!email) return response.status(400).send({ message: 'Por favor, informe um e-mail.' });

    if (!password) return response.status(400).send({ message: 'Por favor, informe uma senha.' });

    const user = await User.findBy({ email });
    if (user) {
      const isAuth = await Hash.verify(password, user.password);
      if (isAuth) {
        return await auth.withRefreshToken().generate(user);
      } else {
        return response.status(400).send({ message: 'E-mail e/ou senha inválidos.' });
      }
    }
    return response.status(400).send({ message: 'E-mail e/ou senha inválidos.' });
  }

  async forgotPassword() {}

  async me({ auth }) {
    return auth.getUser();
  }
}

module.exports = AuthController;
