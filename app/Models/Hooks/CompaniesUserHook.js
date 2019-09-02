'use strict';

const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const CompaniesUserHook = (exports = module.exports = {});

CompaniesUserHook.validate = async modelInstance => {
  const rules = {
    company_id: 'required|exists:companies,id',
    user_id: 'required|exists:users,id'
  };

  const messages = {
    'company_id.required': 'Por favor, preencha a empresa',
    'company_id.exists': 'Por favor, selecione uma empresa válida',
    'user_id.required': 'Por favor, preencha o usuário',
    'user_id.exists': 'Por favor, selecione um usuário válido'
  };

  const validation = await validateAll(modelInstance.$attributes, rules, messages);

  if (validation.fails()) throw new ValidationException(validation.messages());
};
