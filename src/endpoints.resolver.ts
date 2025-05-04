import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetHostsStringifyActionArgs } from './endpoints-stringify-action.arg';
import { StringifyHostsResponse } from './endpoints-stringify-response';
import { EndpointsService } from './services/endpoints-service';

@Resolver()
export class EndpointsResolver {
  constructor(private readonly endpointsService: EndpointsService) { }
  @Query(() => StringifyHostsResponse, {
    name: 'stringifyHosts',
  })
  stringifyHosts(
    @Args() args: GetHostsStringifyActionArgs,
  ) {
    const { selectedHosts } = args;

    const hosts = this.endpointsService.stringifyEndpoints(
      selectedHosts,
    );
    return {
      objectString: hosts
    };
  }
}

