'use strict';

const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const BillingCycleHook = (exports = module.exports = {});

BillingCycleHook.validate = async modelInstance => {
  const rules = {
    billing_cycles_type_id: 'required|exists:billing_cycles_types,id',
    billing_cycles_category_id: 'required|exists:billing_cycles_categories,id',
    value: 'required|number',
    description: 'required'
  };

  const messages = {
    'billing_cycles_type_id.required':
      'Por favor, informe o tipo do ciclo de faturamento.',
    'billing_cycles_type_id.exists': 'Por favor, informe um tipo válido.',
    'billing_cycles_category_id.required':
      'Por favor, informe a categoria do ciclo de faturamento.',
    'billing_cycles_category_id.exists':
      'Por favor, informe uma categoria válida.',
    'value.required': 'Por favor, informe o valor.',
    'value.number': 'Por favor, o valor precisa ser um valor decimal',
    'description.required': 'Por favor, informe a descrição.'
  };

  const validation = await validateAll(
    modelInstance.$attributes,
    rules,
    messages
  );
  if (validation.fails()) throw new ValidationException(validation.messages());
};
