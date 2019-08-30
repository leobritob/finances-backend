'use strict';

const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const CompanyHook = (exports = module.exports = {});

CompanyHook.validate = async modelInstance => {
  const rules = {
    social_name: 'required',
    fantasy_name: 'required',
    cnpj: 'required'
  };

  const messages = {
    'social_name.required': 'Por favor, preencha a razão social',
    'fantasy_name.required': 'Por favor, preencha o nome fantasia',
    'cnpj.required': 'Por favor, preencha o cnpj'
  };

  const validation = await validateAll(modelInstance.$attributes, rules, messages);

  if (validation.fails()) throw new ValidationException(validation.messages());
};
