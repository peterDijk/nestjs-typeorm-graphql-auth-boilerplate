import { Field, ObjectType } from '@nestjs/graphql';

export interface JwtPayload {
  username: string;
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
}

@ObjectType()
export class LoginStatus {
  @Field()
  email: string;

  @Field()
  accessToken: string;
}
