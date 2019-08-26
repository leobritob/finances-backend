'use strict';

const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const BillingCycleHook = (exports = module.exports = {});

BillingCycleHook.validate = async modelInstance => {
  const rules = {
    billing_cycles_category_id: 'required|exists:billing_cycles_categories,id',
    value: 'required|number',
    date: 'required|date',
    description: 'required|max:255'
  };

  const messages = {
    'billing_cycles_category_id.required': 'Por favor, informe a categoria do ciclo de faturamento.',
    'billing_cycles_category_id.exists': 'Por favor, informe uma categoria válida.',
    'value.required': 'Por favor, informe o valor.',
    'value.number': 'Por favor, o valor precisa ser um valor decimal',
    'date.required': 'Por favor, informe a data.',
    'date.date': 'Por favor, informe a data válida.',
    'description.required': 'Por favor, informe a descrição.',
    'description.max': 'A descrição atingiu o limite de 255 caracteres.'
  };

  const validation = await validateAll(modelInstance.$attributes, rules, messages);
  if (validation.fails()) throw new ValidationException(validation.messages());
};
