import { registerAs } from '@nestjs/config';
import devDbConfig from './dev.config';
// import { CognitoService } from 'src/aws/cognito/cognito.service';

export default registerAs('typeOrmConfig', async () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  let data;
  if (process.env.USE_LOCAL_DB === 'true') {
    data = devDbConfig();
  } else {
    // data = await CognitoService.getDbConfigFromAwsParam();
  }
  console.log(
    'data is ' + JSON.stringify(data),
    nodeEnv === 'development',
    process.env.DB_SYNC === 'true',
  );
  return {
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    type: 'postgres' as 'postgres',
    host: data.host,
    port: parseInt(data.port),
    username: data.username,
    password: data.password,
    database: data.dbname,
    autoLoadEntities: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: __dirname + '/../database/migrations',
    },
    synchronize: process.env.DB_SYNC === 'true',
    logging: true,
    pool: {
      max: 25,
      min: 1,
      maxWaitingClients: 10,
      idleTimeoutMillis: 300000,
    },
  };
});
