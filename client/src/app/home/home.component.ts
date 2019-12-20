import { Component } from '@angular/core';

import { User, Employee } from '@/_models';
import { UserService, AuthenticationService, EmployeeService } from '@/_services';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({ templateUrl: 'home.component.html', styleUrls: ['./home.component.css'] })
export class HomeComponent {
    currentUser: User;
    employeeFromApi: any;

    constructor(
        private userService: UserService,
        private employeeService: EmployeeService,
        private authenticationService: AuthenticationService,
        private modal: NgbModal
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        console.log(this.currentUser);
        debugger
    }

    ngOnInit() {
        this.employeeService.getEmployeeById(this.currentUser.employeeID).subscribe((res: any) => {
            debugger
            console.log(this.currentUser);
            this.employeeFromApi = res.data;
            console.log(this.employeeFromApi);
            debugger
        });
    }
}
