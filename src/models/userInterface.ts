export interface User {
  id: number;
  username: string;
  name: string;
  lastname: string;
  mothername: string;
  email: string;
  code: string;
  phone: string;
  degree: string;
  role: string;
}

export interface UserRequest {
  name: string;
  lastname: string;
  mothername: string;
  username?: string;
  email: string;
  code: string;
  phone: string;
  degree: string;
  roles: number[];
  role_id: number;
  isStudent: boolean;
  is_scholarship: boolean;
}
