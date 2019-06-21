exports.config = {
  environment: 'development',
  common: {
    database: {
      name: process.env.DB_NAME_DEV
    },
    external_api_url: process.env.EXTERNAL_API_URL
  },
  isDevelopment: true
};
