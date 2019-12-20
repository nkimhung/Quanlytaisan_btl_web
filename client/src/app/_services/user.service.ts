import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User,EmployeeAdmin } from '@/_models';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`http://localhost:4000/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`http://localhost:4000/users/${id}`);
    }

    getAllAdmin() {
        return this.http.get<EmployeeAdmin[]>(`http://localhost:4000/users/employeeAdmin`);
    }

}