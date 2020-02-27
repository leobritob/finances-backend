'use strict';

/**@type {typeof import('@adonisjs/vow/src/Suite')} */
const { test } = use('Test/Suite')('Users');
/**@type {typeof import('../../app/Models/Hooks/UserHook')} */
const UserHook = use('App/Models/Hooks/UserHook');
/**@type {typeof import('@adonisjs/validator/src/Validator')} */
const { validateAll } = use('Validator');

test('user register validation from UserHook', async ({ assert }) => {
  let attrs = {};

  const { rules, messages } = UserHook.setup(attrs);
  const validation = await validateAll(attrs, rules, messages);

  assert.isTrue(validation.fails());
  assert.deepEqual(
    validation.messages().map(({ field, validation }) => ({ field, validation })),
    [
      {
        field: 'first_name',
        validation: 'required',
      },
      {
        field: 'last_name',
        validation: 'required',
      },
      {
        field: 'email',
        validation: 'required',
      },
      {
        field: 'password',
        validation: 'required',
      },
    ]
  );
});
