import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './database/db.config';
import { GraphQLDate } from 'graphql-scalars';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './models/user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: './graphqlschema.gql',
      driver: ApolloDriver,
      sortSchema: true,
      playground: true,
      context: ({ req }) => ({ headers: req.headers }),
      buildSchemaOptions: {
        scalarsMap: [{ type: () => GraphQLDate, scalar: GraphQLDate }],
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [dbConfig],
    }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
