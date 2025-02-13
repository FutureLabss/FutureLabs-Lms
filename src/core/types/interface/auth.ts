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
export interface resendemail {
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

  export interface CreateUserProfile{
    first_name?: string;
    middle_name?: string;
    surname?: string;
    email?: string;
    age_range?: string;
    gender?: "male" | "female" | "other";
    address?: string;
    state?: string;
    lga?: string;
    phone_number?: string;
    experience?: "beginner" | "intermediate" | "expert";
    heard_about_us?: string;
    skill?: "web development" | "ui/ux" | "data analitics" | "digital marketing";
  }
  
  
  