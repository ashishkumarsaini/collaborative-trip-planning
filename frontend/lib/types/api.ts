export type APIResponseType<T> = {
  message: string,
  statusCode: number,
  success: boolean,
  data: T
}