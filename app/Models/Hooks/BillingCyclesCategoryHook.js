'use strict';

const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const BillingCyclesCategoryHook = (exports = module.exports = {});

BillingCyclesCategoryHook.validate = async modelInstance => {
  const rules = {
    company_id: 'required|exists:companies,id',
    billing_cycles_type_id: 'required|exists:billing_cycles_types,id',
    name: 'required|max:255'
  };

  const messages = {
    'company_id.required': 'Por favor, selecione uma empresa.',
    'company_id.exists': 'Por favor, informe uma empresa válida.',
    'name.required': 'Por favor, preencha o nome.',
    'name.max': 'O nome atingiu o limite de 255 caracteres.',
    'billing_cycles_type_id.required': 'Por favor, informe o tipo do ciclo de faturamento.',
    'billing_cycles_type_id.exists': 'Por favor, informe um tipo válido.'
  };

  const validation = await validateAll(modelInstance.$attributes, rules, messages);
  if (validation.fails()) throw new ValidationException(validation.messages());
};
