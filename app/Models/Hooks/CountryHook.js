'use strict';

const { validateAll } = use('Validator');
const ValidationException = use('App/Exceptions/ValidationException');

const CountryHook = (exports = module.exports = {});

CountryHook.validate = async modelInstance => {
  const rules = {
    name: 'required|min:1|max:255',
    name_translate: 'required|min:1|max:255',
    initials: 'min:2|max:2',
  };

  const messages = {
    'name.required': 'Por favor, informe um nome.',
    'name.min': 'O nome precisa ter no mínimo 2 caracteres.',
    'name.max': 'O nome atingiu limite máximo de 255 caracteres.',
    'name_translate.required': 'Por favor, informe a versão traduzida (pt-BR) do nome.',
    'name_translate.min': 'A versão traduzida do nome precisa ter no mínimo 2 caracteres.',
    'name_translate.max': 'A versão traduzida do nome atingiu limite máximo de 255 caracteres.',
    'initials.min': 'As iniciais precisam ter no mínimo 2 caracteres',
    'initials.max': 'As iniciais atingiram o limite máximo de 2 caracteres',
  };

  const validation = await validateAll(modelInstance.$attributes, rules, messages);
  if (validation.fails()) {
    console.log(JSON.stringify(validation.messages(), null, 2));
    throw new ValidationException(validation.messages());
  }
};
