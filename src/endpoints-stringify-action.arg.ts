import { ArgsType, Field, InputType } from '@nestjs/graphql';

@ArgsType()
export class GetHostsStringifyActionArgs {
  @Field(() => [SelectedHost], {
    description: 'Array of selected hosts',
  })
  selectedHosts: SelectedHost[];
}

@InputType()
export class SelectedHost {
  @Field(() => String, {
    description: 'Endpoint hostname',
  })
  hostName: string;
  @Field(() => Number, {
    description: 'Endpoint hdSerial',
  })
  hdSerial: number;
}
