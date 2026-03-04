import { type LoginFormSchemaType, type SignUpFormSchemaType } from "../validators";
import { type APIResponseType } from "./api";
import { type User } from "./user";

export type AuthInitialState = {
  accessToken: string,
  refreshToken: string,
  user: User
};

export type RegisterUserRequestType = {
  body: SignUpFormSchemaType
};

export type RegisterUserResponseType = APIResponseType<{
  user: User,
}>;

export type LoginUserRequestType = {
  body: LoginFormSchemaType
}

export type LoginUserResponseType = APIResponseType<{
  user: User,
  accessToken: string,
  refreshToken: string
}>;