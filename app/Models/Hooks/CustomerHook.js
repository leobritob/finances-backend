'use strict';

const { validateAll, rule } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const CustomerHook = (exports = module.exports = {});

CustomerHook.validate = async modelInstance => {
  const rules = {
    first_name: 'required|max:255',
    last_name: 'required|max:255',
    birthday_date: [rule('date'), rule('dateFormat', 'YYYY-MM-DD')],
    gender: 'string',
    // profession: '',
    // cellphone: '',
    // phone: '',
    cpf: 'cpf',
    // rg: '',
    // street_name: '',
    // street_number: '',
    // district: '',
    // zipcode: '',
    city_id: 'number|exists:cities,id',
    state_id: 'number|exists:states,id',
    country_id: 'number|exists:countries,id',
  };

  const messages = {
    'first_name.required': 'Por favor, informe seu nome',
    'first_name.max': 'O nome atingiu o limite máximo de 255 caracteres',
    'last_name.required': 'Por favor, informe o sobrenome',
    'last_name.max': 'O sobrenome atingiu o limite máximo de 255 caracteres',
    'birthday_date.date': 'A data de nascimento precisa ser uma data válida',
    'birthday_date.dateFormat': 'A data de nascimento precisa ter o formato válido (YYYY-MM-DD)',
    'cpf.cpf': 'Por favor, informe um cpf válido',
    'city_id.number': 'A cidade selecionada precisar ser um número',
    'city_id.exists': 'Por favor, informe uma cidade válida',
    'state_id.number': 'O estado selecionado precisar ser um número',
    'state_id.exists': 'Por favor, informe um estado válido',
    'country_id.number': 'O país selecionado precisar ser um número',
    'country_id.exists': 'Por favor, informe um país válido',
  };

  const validation = await validateAll(modelInstance.$attributes, rules, messages);
  if (validation.fails()) throw new ValidationException(validation.messages());
};
