export interface User {
    id: number;
    first_name: string;
    surname: string;
    email: string;
    age_range: string; 
    gender: "male" | "female" | "other";
    address: string;
    state: string;
    lga: string;
    phone_number: string;
    experience: "beginner" | "intermediate" | "advanced"; 
    heard_about_us: string; 
    service_id: number;
    created_at: string; 
    updated_at: string;
  }
  
  export interface IUsers {
    success: boolean;
    message: string;
    data: User[];
  }
  