export interface ICreatePassword {
    email?:  string | string[] | undefined;
    password: string;
    confirm_password:string;
    remember_me?:boolean
  }
export interface ILogin {
    email: string;
    password: string;
  }
  
export interface verifymail {
    email?: string | undefined | string[];
    token?: string | undefined | string[];
  }
  export interface Auth {
    name: string;
    id:string;
    token: string;

  }
  export interface AuthResponse {
    success: boolean;
    message: string;
    data: Auth;
  }
  
  