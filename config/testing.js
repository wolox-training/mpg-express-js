exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },
    external_api_url: process.env.EXTERNAL_API_URL,
    session: {
      secret: 'some-super-secret'
    }
  }
};
