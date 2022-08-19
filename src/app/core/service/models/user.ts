export interface IUser {
    id: string;
    userName: string;
    name: string;
    lastName: string;
    fullName: string;
    email: string;
    active: boolean;
    roles: string[];
  }


  export class User implements IUser {
    public id!: string;
    public userName!: string;
    public name!: string;
    public lastName!: string;
    public fullName!: string;
    public email!: string;
    public active: boolean = false;
    public roles!: string[];
    constructor() {}
  
    public static getIntance(): IUser {
      const user: IUser = {
        id: '',
        userName: '',
        lastName: '',
        name: '',
        fullName: '',
        email: '',
        active: false,
        roles: [],
      };
      return user;
    }
  }