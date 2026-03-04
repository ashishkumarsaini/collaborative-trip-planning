export enum ROLE {
  user = 'user',
  subAdmin = 'subAdmin',
  admin = 'admin'
}

export type User = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  role: ROLE
}