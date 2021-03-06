exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },
    session: {
      secret: 'some-super-secret',
      expirationTime: 1
    },
    external_api_url: 'fake-url.com'
  }
};
