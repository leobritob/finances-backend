'use strict';

const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const BillingCyclesTypeHook = (exports = module.exports = {});

BillingCyclesTypeHook.validate = async modelInstance => {
  const rules = {
    name: 'required',
    description: 'required'
  };

  const messages = {
    'name.required': 'Por favor, informe o nome.',
    'description.required': 'Por favor, informe a descrição.'
  };

  const validation = await validateAll(
    modelInstance.$attributes,
    rules,
    messages
  );
  if (validation.fails()) throw new ValidationException(validation.messages());
};
