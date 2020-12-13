import { Role } from './Role';

export class User {
    id: Number;
    username: string;
    email: string;
    password: string;
    loggedIn: boolean;
    role: Role;

}