import { Role } from "./role";

export class User {
    id: number;
    username: string;
    password: string;
    employeeID: number;
    timeCreated: number;
    createBy: number;
    modifiedBy: number;
    role: Role;
    token: string;
}
