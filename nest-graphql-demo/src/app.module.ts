import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PetsModule } from './pets/pets.module';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver : ApolloDriver,
      autoSchemaFile : join(process.cwd(),'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type : 'sqlite',
      database : ':memory:',
      entities : ['dist/**/*.entity{.ts,.js}'],
      synchronize : true
    }),
    PetsModule,
    OwnersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
