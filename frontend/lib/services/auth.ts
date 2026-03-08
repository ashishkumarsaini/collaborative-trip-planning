import { api, buildRequestUrl } from "../api";
import type {
  LoginUserRequestType,
  LoginUserResponseType,
  RegisterUserRequestType,
  RegisterUserResponseType,
} from "../types";
import type { APIResponseType } from "../types/api";
import type { User } from "../types/user";

const AUTH_NAMESPACE = "auth";

export type GetProfileResponseType = APIResponseType<{ user: User }>;

export const registerUser = (requestOptions: RegisterUserRequestType) => {
  return api.post<RegisterUserResponseType>(buildRequestUrl(`/${AUTH_NAMESPACE}/register`), requestOptions);
};

export const loginUser = (requestOptions: LoginUserRequestType) => {
  return api.post<LoginUserResponseType>(buildRequestUrl(`/${AUTH_NAMESPACE}/login`), requestOptions);
};

export const getProfile = () => {
  return api.get<GetProfileResponseType>(buildRequestUrl(`/${AUTH_NAMESPACE}/profile`));
};

export const logoutUser = () => {
  return api.post<LoginUserResponseType>(buildRequestUrl(`/${AUTH_NAMESPACE}/logout`));
};
