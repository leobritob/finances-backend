'use strict';

const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const StateHook = (exports = module.exports = {});

StateHook.validate = async modelInstance => {
  const rules = {
    name: 'required|min:1|max:255',
    uf: 'required|min:2|max:2',
    country_id: 'required|exists:countries,id',
  };

  const messages = {
    'name.required': 'Por favor, informe um nome.',
    'name.min': 'O nome precisa ter no mínimo 2 caracteres.',
    'name.max': 'O nome atingiu limite máximo de 255 caracteres.',
    'uf.required': 'Por favor, informe a UF.',
    'uf.min': 'A versão traduzida do nome precisa ter no mínimo 2 caracteres.',
    'uf.max': 'A versão traduzida do nome atingiu limite máximo de 2 caracteres.',
    'country_id.required': 'Por favor, informe o país.',
    'country_id.existss': 'O país informado não existe.',
  };

  const validation = await validateAll(modelInstance.$attributes, rules, messages);
  if (validation.fails()) throw new ValidationException(validation.messages());
};
