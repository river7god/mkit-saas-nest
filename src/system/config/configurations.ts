const loadConfig = () => {
    const { env } = process;
  
    return {
      db: {
        database: env.TYPEORM_MYSQL_DATABASE,
        host: env.TYPEORM_MYSQL_HOST,
        port: +env.TYPEORM_MYSQL_PORT || 3306,
        username: env.TYPEORM_MYSQL_USERNAME,
        password: env.TYPEORM_MYSQL_PASSWORD,
      },
      redis: {
        host: env.REDIS_HOST,
        port: parseInt(env.REDIS_PORT) || 6379,
      },
    };
  };
  
  export default loadConfig;
  