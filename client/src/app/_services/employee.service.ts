import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from '@/_models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployee() {
    return this.http.get<Employee[]>(`http://localhost:4000/users/employee`);
  }
    getStatistic() {
        return this.http.get<Employee[]>(`http://localhost:4000/users/getstatistic`);
    }

  getEmployeeById(id: number) {
    console.log(id)
    return this.http.get<Employee>(`http://localhost:4000/users/${id}`);
  }
}
