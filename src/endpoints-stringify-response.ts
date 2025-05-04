import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StringifyHostsResponse {
  @Field(() => String)
  objectString: string;
}
