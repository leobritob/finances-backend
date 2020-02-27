'use strict';

/**@type {typeof import('@adonisjs/vow/src/Suite')} */
const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Users');
/**@type {typeof import('../../app/Models/User')} */
const UserModel = use('UserModel');

let USER = {
  EMAIL: 'admin@admin.com',
  PASSWORD: '123456789',
};

const ENDPOINT = {
  AUTH: '/api/auth/token',
  USER: '/api/v1/users',
};

trait('Test/ApiClient');

const getToken = async client => {
  const response = await client
    .post(ENDPOINT.AUTH)
    .send({
      email: USER.EMAIL,
      password: USER.PASSWORD,
    })
    .end();
  return response.body.token;
};

beforeEach(async () => {
  await UserModel.create({
    first_name: 'admin',
    last_name: 'admin',
    email: USER.EMAIL,
    password: USER.PASSWORD,
  });
});

afterEach(async () => {
  await UserModel.query()
    .where('id', '>=', 1)
    .delete();
});

test('create an user', async ({ client }) => {
  await UserModel.query()
    .where('id', '>=', 1)
    .delete();

  const response = await client
    .post(ENDPOINT.USER)
    .send({ first_name: 'admin', last_name: 'admin', email: USER.EMAIL, password: USER.PASSWORD })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    first_name: 'admin',
    last_name: 'admin',
    email: USER.EMAIL,
    full_name: 'admin admin',
  });
});

test('show a list of users', async ({ client }) => {
  const token = await getToken(client);

  const responseGetUsers = await client
    .get(ENDPOINT.USER)
    .header('Authorization', `Bearer ${token}`)
    .end();
  responseGetUsers.assertStatus(200);
  responseGetUsers.assertJSONSubset([{ email: USER.EMAIL }]);
});

test('show a paginate list of users', async ({ client }) => {
  const token = await getToken(client);

  const responseGetUsers = await client
    .get(ENDPOINT.USER)
    .query({ perPage: 20 })
    .header('Authorization', `Bearer ${token}`)
    .end();
  responseGetUsers.assertStatus(200);
  responseGetUsers.assertJSONSubset({ page: 1 });
});

test('search for an user', async ({ client }) => {
  const token = await getToken(client);

  const responseGetUsers = await client
    .get(ENDPOINT.USER)
    .query({ search: 'admin', perPage: 20 })
    .header('Authorization', `Bearer ${token}`)
    .end();
  responseGetUsers.assertStatus(200);
  responseGetUsers.assertJSONSubset({ page: 1, perPage: 20, data: [{ email: USER.EMAIL }] });
});

test('show only user', async ({ client }) => {
  const token = await getToken(client);

  const { id } = await UserModel.first();

  const responseShowOnlyUser = await client
    .get(ENDPOINT.USER + '/' + id)
    .header('Authorization', `Bearer ${token}`)
    .end();

  responseShowOnlyUser.assertStatus(200);
  responseShowOnlyUser.assertJSONSubset({ email: USER.EMAIL });
});

test('update user details', async ({ client }) => {
  const token = await getToken(client);

  const { id } = await UserModel.first();

  const responseUpdateUser = await client
    .put(ENDPOINT.USER + '/' + id)
    .header('Authorization', `Bearer ${token}`)
    .send({ last_name: 'admin2' })
    .end();
  responseUpdateUser.assertStatus(200);
  responseUpdateUser.assertJSONSubset({ last_name: 'admin2' });
});

test('delete an user', async ({ client }) => {
  const token = await getToken(client);

  const { id } = await UserModel.first();

  const responseDeleteUser = await client
    .delete(ENDPOINT.USER + '/' + id)
    .header('Authorization', `Bearer ${token}`)
    .end();
  responseDeleteUser.assertStatus(204);
});
