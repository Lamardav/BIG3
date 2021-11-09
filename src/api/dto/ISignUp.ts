export interface IFormImputsSignUp {
    userName:string;
    login: string;
    password: string; 
  }

  export interface ISignUpInits {
    loading: boolean;
    status: string | null; 
    error: string | null|boolean|unknown;
  }