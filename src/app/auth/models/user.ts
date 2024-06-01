export interface IUser {
  username: string;
  password: string;
  role: 'Admin' | 'Hero';
}

export interface IRegisterRequest {
  name: string;
  powers: string;
  description: string;
  username: string;
  password: string;
  role: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}
