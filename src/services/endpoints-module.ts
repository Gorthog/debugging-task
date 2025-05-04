import { Module } from '@nestjs/common';
import { EndpointsService } from './endpoints-service';

@Module({
  imports: [
  ],
  providers: [EndpointsService],
  exports: [EndpointsService],
})
export class EndpointsServicesModule { }
