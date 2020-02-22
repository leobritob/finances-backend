'use strict';

/**@type {import('@adonisjs/vow/src/Suite')} */
const { test, trait } = use('Test/Suite')('Users');

let USER = {
  EMAIL: 'admin@admin.com',
  PASSWORD: '123456789',
};

const ENDPOINT = {
  AUTH: '/api/auth/token',
  USER: '/api/v1/users',
};

trait('Test/ApiClient');

test('create an user', async ({ client }) => {
  const response = await client
    .post(ENDPOINT.USER)
    .send({
      first_name: 'admin',
      last_name: 'admin',
      email: USER.EMAIL,
      password: USER.PASSWORD,
    })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    first_name: 'admin',
    last_name: 'admin',
    email: USER.EMAIL,
    full_name: 'admin admin',
  });
});

test('get user token', async ({ client }) => {
  const responseAuth = await client
    .post(ENDPOINT.AUTH)
    .send({
      email: USER.EMAIL,
      password: USER.PASSWORD,
    })
    .end();
  responseAuth.assertStatus(200);
  responseAuth.assertJSONSubset({ type: 'bearer' });
});

test('show a list of users', async ({ client }) => {
  const {
    body: { token },
  } = await client
    .post(ENDPOINT.AUTH)
    .send({
      email: USER.EMAIL,
      password: USER.PASSWORD,
    })
    .end();

  const responseGetUsers = await client
    .get(ENDPOINT.USER)
    .header('Authorization', `Bearer ${token}`)
    .end();
  responseGetUsers.assertStatus(200);
  responseGetUsers.assertJSONSubset({ page: 1 });
});

test('show only user', async ({ client }) => {
  const {
    body: { token },
  } = await client
    .post(ENDPOINT.AUTH)
    .send({
      email: USER.EMAIL,
      password: USER.PASSWORD,
    })
    .end();

  const responseShowOnlyUser = await client
    .get(ENDPOINT.USER + '/1')
    .header('Authorization', `Bearer ${token}`)
    .end();

  responseShowOnlyUser.assertStatus(200);
  responseShowOnlyUser.assertJSONSubset({
    first_name: 'admin',
    last_name: 'admin',
    full_name: 'admin admin',
  });
});

test('update user details', async ({ client }) => {
  const {
    body: { token },
  } = await client
    .post(ENDPOINT.AUTH)
    .send({
      email: USER.EMAIL,
      password: USER.PASSWORD,
    })
    .end();

  const responseUpdateUser = await client
    .put(ENDPOINT.USER + '/1')
    .header('Authorization', `Bearer ${token}`)
    .send({ last_name: 'admin1' })
    .end();
  responseUpdateUser.assertStatus(200);
  responseUpdateUser.assertJSONSubset({ first_name: 'admin', last_name: 'admin1' });
});

test('delete an user', async ({ client, assert }) => {
  const {
    body: { token },
  } = await client
    .post(ENDPOINT.AUTH)
    .send({
      email: USER.EMAIL,
      password: USER.PASSWORD,
    })
    .end();

  const responseDeleteUser = await client
    .delete(ENDPOINT.USER + '/1')
    .header('Authorization', `Bearer ${token}`)
    .end();
  responseDeleteUser.assertStatus(204);
  assert.isNull(responseDeleteUser.body);
});
