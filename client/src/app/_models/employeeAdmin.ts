import { Role } from "./role";

export class EmployeeAdmin {
  id: number;
  code: string;
  fullName: string;
  email: string;
  role: Role;
  phone: string;
  address: string;
  avatar:string;
  birthDate: number;
  jobStartDate: number;
  jobEndDate: number;
  jobTitle: string;
  gender:string;
  timeCreated: number;
  createdBy: number;
  status: string
}