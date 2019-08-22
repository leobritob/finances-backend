'use strict';

const Hash = use('Hash');
const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const UserHook = (exports = module.exports = {});

UserHook.validate = async modelInstance => {
  let uniqueWhenUpdate = '';
  if (modelInstance.$attributes.id) {
    uniqueWhenUpdate = `,id,${modelInstance.$attributes.id}`;
  }

  const rules = {
    first_name: 'required|min:2|max:255',
    last_name: 'required|min:2|max:255',
    email: `required|email|unique:users,email${uniqueWhenUpdate}`,
    password: 'required|min:6'
  };

  const messages = {
    'first_name.required': 'Por favor, informe seu nome.',
    'first_name.min': 'Seu primeiro nome precisa ter no mínimo 2 caracteres.',
    'first_name.max': 'Você atingiu limite máximo de 255 caracteres.',
    'last_name.required': 'Por favor, informe seu sobrenome.',
    'last_name.min': 'Seu sobrenome precisa ter no mínimo 2 caracteres.',
    'last_name.max': 'Você atingiu limite máximo de 255 caracteres.',
    'email.required': 'Por favor, informe seu e-mail.',
    'email.email': 'Por favor, informe um e-mail válido',
    'email.unique': 'Este e-mail já está em uso.',
    'password.required': 'Por favor, informe sua senha.',
    'password.min': 'Sua senha precisa ter no mínimo 6 caracteres.'
  };

  const validation = await validateAll(
    modelInstance.$attributes,
    rules,
    messages
  );

  if (validation.fails()) throw new ValidationException(validation.messages());
};

UserHook.hashPassword = async userInstance => {
  if (userInstance.dirty.password) {
    userInstance.password = await Hash.make(userInstance.password);
  }
};
