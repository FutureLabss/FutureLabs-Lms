export interface ICreatePassword {
    email: string;
    password: string;
    confirm_password:string;
    remember_me?:boolean
  }
export interface ILogin {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    id: string;
    email: string;
    fullname: string;
    token: string;
    refreshToken: string;
  }
  