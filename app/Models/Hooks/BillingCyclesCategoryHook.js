'use strict';

const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const BillingCyclesCategoryHook = (exports = module.exports = {});

BillingCyclesCategoryHook.validate = async modelInstance => {
  const rules = {
    name: 'required'
  };

  const messages = {
    'name.required': 'Por favor, preencha o nome.'
  };

  const validation = await validateAll(
    modelInstance.$attributes,
    rules,
    messages
  );
  if (validation.fails()) throw new ValidationException(validation.messages());
};
