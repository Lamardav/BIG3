export interface PropsRoute {
    exact?: boolean;
    render?: (n: string) => void;
    path: string;
    component?:any;
  }