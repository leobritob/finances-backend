'use strict';

const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const BillingCyclesCategoryHook = (exports = module.exports = {});

BillingCyclesCategoryHook.validate = async modelInstance => {
  const rules = {
    billing_cycles_type_id: 'required|exists:billing_cycles_types,id',
    name: 'required'
  };

  const messages = {
    'name.required': 'Por favor, preencha o nome.',
    'billing_cycles_type_id.required':
      'Por favor, informe o tipo do ciclo de faturamento.',
    'billing_cycles_type_id.exists': 'Por favor, informe um tipo válido.'
  };

  const validation = await validateAll(
    modelInstance.$attributes,
    rules,
    messages
  );
  if (validation.fails()) throw new ValidationException(validation.messages());
};
