'use strict';

const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const InvestmentHook = (exports = module.exports = {});

InvestmentHook.validate = async modelInstance => {
  const rules = {
    investments_type_id: 'required|exists:investments_types,id',
    name: 'required|max:255',
    description: 'required|max:255',
    value: 'required|number',
    date: 'required|date',
    due_date: 'required|date'
  };

  const messages = {
    'investments_type_id.required': 'Por favor, informe o tipo de investimento',
    'investments_type_id.exists': 'Por favor, informe o tipo de investimento válido',
    'name.required': 'Por favor, informe o nome.',
    'name.max': 'O nome atingiu o limite de 255 caracteres.',
    'description.required': 'Por favor, informe a descrição.',
    'description.max': 'A descrição atingiu o limite de 255 caracteres.',
    'value.required': 'Por favor, informe o valor do investimento.',
    'value.number': 'Por favor, o valor do investimento precisa ser um número.',
    'date.required': 'Por favor, a data em que o investimento foi realizada.',
    'date.date': 'Por favor, a data precisa ser uma data válida.',
    'due_date.required': 'Por favor, a data em que o investimento terá seu vencimento.',
    'due_date.date': 'Por favor, a data de vencimento precisa ser uma data válida.'
  };

  const validation = await validateAll(modelInstance.$attributes, rules, messages);
  if (validation.fails()) throw new ValidationException(validation.messages());
};
