import { Module } from '@nestjs/common';
import { EndpointsModule } from './endpoints-resolver.module';

@Module({
  imports: [EndpointsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
