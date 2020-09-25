export interface Authentication {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
    admin: boolean;
}