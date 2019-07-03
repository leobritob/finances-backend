const { hooks } = require('@adonisjs/ignitor');
const { validarCPF, validarCNPJ } = use('App/Utils/Validations');

hooks.before.providersRegistered(() => {});

hooks.after.providersRegistered(() => {});

hooks.before.providersBooted(() => {});

hooks.after.providersBooted(() => {
  validatorExtends();
});

hooks.before.preloading(() => {});

hooks.after.preloading(() => {});

hooks.before.httpServer(() => {});

hooks.after.httpServer(() => {});

hooks.before.aceCommand(() => {});

hooks.after.aceCommand(() => {});

/**
 * Método responsável por extender os validators
 */
const validatorExtends = () => {
  const Validator = use('Validator');
  const Database = use('Database');

  const existsValidator = async (data, field, message, args, get) => {
    let value = get(data, field);
    value = Array.isArray(value) ? value : [value];

    const [table, column] = args;
    const row = await Database.table(table)
      .whereIn(column, value)
      .first();

    if (!row) throw message;
  };

  const cpfValidator = async (data, field, message, args, get) => {
    const cpf = get(data, field);

    if (!validarCPF(cpf)) throw message;
  };

  const cnpjValidator = async (data, field, message, args, get) => {
    const cnpj = get(data, field);

    if (!validarCNPJ(cnpj)) throw message;
  };

  const uniqueDataValidator = async (data, field, message, args, get) => {
    const value = get(data, field);
    const table = args[0];
    delete args[0];

    let row = Database.table(table);

    const convertToPrimite = param => {
      switch (param.toLowerCase()) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return param;
      }
    };

    args.forEach(column => {
      if (column.indexOf('!=') >= 0) {
        let c = column.split('!=');

        row.whereNot(c[0], convertToPrimite(c[1]));
      } else if (column.indexOf('=') >= 0) {
        let c = column.split('=');

        row.where(c[0], convertToPrimite(c[1]));
      } else if (get(data, column)) {
        row.where(column, get(data, column));
      }
    });

    row = await row.first();

    if (row) throw message;
  };

  Validator.extend('exists', existsValidator);
  Validator.extend('cpf', cpfValidator);
  Validator.extend('cnpj', cnpjValidator);
  Validator.extend('uniqueData', uniqueDataValidator);
};
