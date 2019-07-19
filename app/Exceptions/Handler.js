'use strict';

const BaseExceptionHandler = use('BaseExceptionHandler');

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { response }) {
    switch (error.name) {
    case 'HttpException':
      response
        .status(404)
        .send({ error: error.name, message: 'Rota não encontrada.' });
      break;
    case 'ModelNotFoundException':
      response
        .status(404)
        .send({ error: error.name, message: 'Registro não encontrado.' });
      break;
    case 'UserNotFoundException':
      response
        .status(400)
        .send({ error: error.name, message: 'E-mail inválido.' });
      break;
    case 'PasswordMisMatchException':
      response
        .status(400)
        .send({ error: error.name, message: 'Senha inválida.' });
      break;
    case 'InvalidJwtToken':
      response.status(401).send({
        error: error.name,
        message: 'Token de autenticação inválido.'
      });
      break;
    case 'InvalidRefreshToken':
      response.status(401).send({
        error: error.name,
        message: 'Token de atualização inválido.'
      });
      break;
    case 'ExpiredJwtToken':
      response.status(401).send({
        error: error.name,
        message: 'Token de autenticação expirou.'
      });
      break;
    case 'ForbiddenException':
      response.status(403).send({
        error: error.name,
        message: 'Acesso negado. Você não tem permissão para acessar.'
      });
      break;
    default:
      return super.handle(...arguments);
    }
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {}
}

module.exports = ExceptionHandler;
