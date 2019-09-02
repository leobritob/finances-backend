'use strict';

const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const InvestmentsTypeHook = (exports = module.exports = {});

InvestmentsTypeHook.validate = async modelInstance => {
  const rules = {
    company_id: 'required|exists:companies,id',
    name: 'required|max:255',
    description: 'required|max:255',
    risk: 'required|number'
  };

  const messages = {
    'company_id.required': 'Por favor, selecione uma empresa.',
    'company_id.exists': 'Por favor, informe uma empresa válida.',
    'name.required': 'Por favor, informe o nome.',
    'name.max': 'O nome atingiu o limite de 255 caracteres.',
    'description.required': 'Por favor, informe a descrição.',
    'description.max': 'A descrição atingiu o limite de 255 caracteres.',
    'risk.required': 'Por favor, informe o risco do investimento.',
    'risk.number': 'O risco do investimento precisa ser um número.'
  };

  const validation = await validateAll(modelInstance.$attributes, rules, messages);
  if (validation.fails()) throw new ValidationException(validation.messages());
};
