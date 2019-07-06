exports.config = {
  environment: 'production',
  common: {
    database: {
      name: process.env.DB_NAME
    },
    external_api_url: process.env.EXTERNAL_API_URL
  },
  isProduction: true
};
