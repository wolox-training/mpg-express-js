exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },
    external_api_url: 'https://jsonplaceholder.typicode.com',
    session: {
      secret: 'some-super-secret'
    }
  }
};
