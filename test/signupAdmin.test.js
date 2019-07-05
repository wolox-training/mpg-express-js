const request = require('supertest'),
  { factory } = require('factory-girl');

const app = require('../app.js');

const adminUserCreatedStatusCode = 200,
  userPermissionsChangeCode = 200,
  alreadyAdminUserErrorCode = 503,
  adminValidEmail = 'admin.user@wolox.co',
  adminValidPassword = 'admin1234',
  validEmail = 'dummy.user@wolox.co',
  validPassword = 'myPassword123',
  name = 'john',
  lastname = 'Doe';

describe('POST /admin/users', () => {
  beforeEach(() =>
    factory.create('user', {
      email: adminValidEmail,
      password: adminValidPassword,
      isAdmin: true
    })
  );

  test('Should sign up a new admin user successfully', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: adminValidEmail, password: adminValidPassword })
      .then(response =>
        request(app)
          .post('/admin/users')
          .set({ token: response.body.token })
          .send({ name, lastname, email: validEmail, password: validPassword })
      )
      .then(response => {
        expect(response.statusCode).toBe(adminUserCreatedStatusCode);
      }));
  test('Should setup admin permissions of a regular user (no admin user)', () =>
    factory.create('user', { password: validPassword }).then(createdUser =>
      request(app)
        .post('/users/sessions')
        .send({ email: adminValidEmail, password: adminValidPassword })
        .then(response =>
          request(app)
            .post('/admin/users')
            .set({ token: response.body.token })
            .send({
              name: createdUser.dataValues.name,
              lastname: createdUser.dataValues.lastname,
              email: createdUser.dataValues.email,
              password: validPassword
            })
        )
        .then(response => {
          expect(response.body.user.is_admin).toBe(true);
          expect(response.statusCode).toBe(userPermissionsChangeCode);
        })
    ));
  test('Should not sign up an user that already exist as admin', () =>
    factory.create('user', { password: validPassword, isAdmin: true }).then(createdAdminUser =>
      request(app)
        .post('/users/sessions')
        .send({ email: adminValidEmail, password: adminValidPassword })
        .then(response =>
          request(app)
            .post('/admin/users')
            .set({ token: response.body.token })
            .send({
              name: createdAdminUser.dataValues.name,
              lastname: createdAdminUser.dataValues.lastname,
              email: createdAdminUser.dataValues.email,
              password: validPassword
            })
        )
        .then(response => {
          expect(response.statusCode).toBe(alreadyAdminUserErrorCode);
        })
    ));
});
