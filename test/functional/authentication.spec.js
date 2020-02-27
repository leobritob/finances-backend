'use strict';

/**@type {typeof import('@adonisjs/vow/src/Suite')} */
const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Authentication');
/**@type {typeof import('../../app/Models/User')} */
const UserModel = use('UserModel');

let USER = {
  EMAIL: 'admin@admin.com',
  PASSWORD: '123456789',
};

const ENDPOINT = {
  AUTH_TOKEN: '/api/auth/token',
  AUTH_ME: '/api/auth/me',
  USER: '/api/v1/users',
};

trait('Test/ApiClient');

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

test('get user token', async ({ client }) => {
  const responseAuth = await client
    .post(ENDPOINT.AUTH_TOKEN)
    .send({ email: USER.EMAIL, password: USER.PASSWORD })
    .end();

  responseAuth.assertStatus(200);
  responseAuth.assertJSONSubset({ type: 'bearer' });
});

test('missing email', async ({ client }) => {
  const responseAuth = await client
    .post(ENDPOINT.AUTH_TOKEN)
    .send({ password: USER.PASSWORD })
    .end();

  responseAuth.assertStatus(400);
  responseAuth.assertJSONSubset({ message: 'Por favor, informe um e-mail.' });
});

test('missing password', async ({ client }) => {
  const responseAuth = await client
    .post(ENDPOINT.AUTH_TOKEN)
    .send({ email: USER.EMAIL })
    .end();

  responseAuth.assertStatus(400);
  responseAuth.assertJSONSubset({ message: 'Por favor, informe uma senha.' });
});

test('the email and/or password are invalid', async ({ client }) => {
  const response = await client
    .post(ENDPOINT.AUTH_TOKEN)
    .send({ email: 'wrong@email.com', password: '123456789' })
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({ message: 'E-mail e/ou senha inválidos.' });
});

test('get auth user details', async ({ client }) => {
  const {
    body: { token },
  } = await client
    .post(ENDPOINT.AUTH_TOKEN)
    .send({ email: USER.EMAIL, password: USER.PASSWORD })
    .end();

  const responseAuthMe = await client
    .get(ENDPOINT.AUTH_ME)
    .header('Authorization', `Bearer ${token}`)
    .end();

  responseAuthMe.assertStatus(200);
  responseAuthMe.assertJSONSubset({ email: USER.EMAIL });
});
