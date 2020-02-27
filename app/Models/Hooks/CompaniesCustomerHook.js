'use strict';

const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const CompaniesCustomerHook = (exports = module.exports = {});

CompaniesCustomerHook.validate = async modelInstance => {
  const rules = {
    company_id: 'exists:companies,id',
    customer_id: 'exists:customers,id',
  };

  const messages = {
    'company_id.exists': 'Por favor, informe uma empresa válida',
    'customer_id.exists': 'Por favor, informe um cliente válido',
  };

  const validation = await validateAll(modelInstance.$attributes, rules, messages);
  if (validation.fails()) throw new ValidationException(validation.messages());
};
