import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(JSON.stringify(localStorage.getItem('currentUser'))));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`http://localhost:4000/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', user);
                    debugger
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }
    public DeleteProductById(id: number) :Observable<any>{
        return this.http.get(`http://localhost:4000/product/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${this.currentUserValue.token}`

            }
        });
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('product');
        this.currentUserSubject.next(null);
    }

    public register(user): Observable<any> {
        return this.http.post(`http://localhost:4000/users/register`, user, {
            headers: {
                Authorization: `Bearer ${this.currentUserValue.token}`

            }
        });
    }
    public changePassword(user): Observable<any> {
        return this.http.post(`http://localhost:4000/users/changepassword`, user);
    }

    public registerEmployee(employee): Observable<any> {
        debugger
        return this.http.post(`http://localhost:4000/users/registerEmployee`, employee, {
            headers: {
                Authorization: `Bearer ${this.currentUserValue.token}`
                
            }
        });
    }

    public updateEmployee(employee): Observable<any> {
        return this.http.post(`http://localhost:4000/users/updateEmployee`, employee);
    }

    public postFile(fileToUpload): Observable<any> {
        const endpoint = 'http://localhost:4000/users/uploadAvatar';
        // const formData: FormData = new FormData();
        // formData.append('fileKey', fileToUpload, fileToUpload.name);
        // console.log(formData);
        return this.http.post(endpoint, fileToUpload);
    }
}
