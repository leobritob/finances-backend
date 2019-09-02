'use strict';

const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const CompanyHook = (exports = module.exports = {});

CompanyHook.validate = async modelInstance => {
  let uniqueWhenUpdate = '';
  if (modelInstance.$attributes.id) {
    uniqueWhenUpdate = `,id!=${modelInstance.$attributes.id}`;
  }

  const rules = {
    social_name: `required|uniqueData:companies,social_name${uniqueWhenUpdate}`,
    fantasy_name: 'required',
    cnpj: `required|cnpj|uniqueData:companies,cnpj${uniqueWhenUpdate}`
  };

  const messages = {
    'social_name.required': 'Por favor, preencha a razão social',
    'social_name.uniqueData': 'Esta razão social já está em uso',
    'fantasy_name.required': 'Por favor, preencha o nome fantasia',
    'cnpj.required': 'Por favor, preencha o cnpj',
    'cnpj.cnpj': 'Por favor, informe um cnpj válido',
    'cnpj.uniqueData': 'Este cnpj já está em uso'
  };

  const validation = await validateAll(modelInstance.$attributes, rules, messages);

  if (validation.fails()) throw new ValidationException(validation.messages());
};
