import { JwtPayload } from "jwt-decode";

export interface DecodedUser extends JwtPayload {
    username: string;
    id: number | null;
};

export enum Urls {
    Registration = 'registration',
    Login = 'login'
};