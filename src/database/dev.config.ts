export default () => {
  if (process.env.NODE_ENV === 'test') {
    return {
      host: process.env.TEST_DB_HOST,
      username: process.env.TEST_DB_USERNAME,
      password: process.env.TEST_DB_PASSWORD,
      dbname: process.env.TEST_DB_NAME,
      port: process.env.TEST_DB_PORT,
    };
  } else {
    return {
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      dbname: process.env.DB_NAME,
      port: process.env.DB_PORT,
    };
  }
};
