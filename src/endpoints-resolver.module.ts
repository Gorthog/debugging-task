import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EndpointsResolver } from './endpoints.resolver';
import { EndpointsServicesModule } from './services/endpoints-module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: { path: 'endpoints.gql', federation: 2 },
    }),
    EndpointsServicesModule
  ],
  providers: [EndpointsResolver],
})
export class EndpointsModule { }
