import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateInfoComponent } from './home/updateinfo/updateinfo.component';
import { ChangePasswordComponent } from './home/change-password/change-password.component'

import { AuthenticationService, SharedService, ProductService, EmployeeService } from './_services';
import { User, Role } from './_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({ selector: 'app', templateUrl: 'app.component.html', styleUrls: ['./app.component.css'] })
export class AppComponent {
    currentUser: User;
    public me = "";
    isShown: boolean = false;
    public c = 1;
    public cart = "";
    public msg = "";
    cartItemCount: number = 0;
    public data = {
        fullName: "",
        avatar:""
    };
    public url ="";

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private sharedService: SharedService,
        private productService: ProductService,
        private employeeService: EmployeeService,
        private modal: NgbModal,
    ) {
        this.authenticationService.currentUser.subscribe(x => {
            this.currentUser = x;
            console.log(this.currentUser);
            if (this.currentUser) {
                this.employeeService.getEmployeeById(this.currentUser.employeeID).subscribe((res: any) => {
                    this.data = res.data;
                    if (res.data.avatar)
                        this.url = "http://localhost:4000/" + res.data.avatar;
                    else
                        this.url = "";
                    this.getAllOrderEmployee();
                    this.getMesageEmployee();
                });
            }
        });
    
    }

    ngOnInit() {
        this.sharedService.currentMessage.subscribe(msg => this.cartItemCount = msg);
        debugger
    }
    keo() {
        this.getAllOrderDetail();
        debugger
    }
    keo1() {
        this.getMesageEmployee();
        this.getAllOrderEmployee();
    }
    getAllOrderDetail(): void {
        this.productService.getAllOrderDetail().subscribe((res: any) => {
            console.log(res);
            if (res.status != 200) {
                console.log(res.msg);
                return;
            }
            this.me = res.data.length;
            debugger
            console.log(this.me);
        });
    };
    getAllOrderEmployee(): void {
        let id = this.authenticationService.currentUserValue.employeeID;
        this.productService.getAllOrderByEmployee(id).subscribe((res: any) => {
            console.log(res);
            if (res.status != 200) {
                console.log(res.msg);
                return;
            }
            debugger
            let d = res.data;
            this.cart = d.length;
            console.log(this.cart);
            debugger
        });
    };
    getMesageEmployee(): void {
        let id = this.authenticationService.currentUserValue.employeeID;
        this.productService.getMessageEmployee(id).subscribe((res: any) => {
            console.log(res);
            if (res.status != 200) {
                console.log(res.msg);
                return;
            }
            debugger
            let d = res.data;
            this.msg = d.length;
            console.log(this.cart);
            debugger
        });
    };
    get isAdmin() {
        if (this.currentUser && this.currentUser.role === Role.Admin && this.c) {
            this.getAllOrderDetail();
            this.c = 0
        }
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    get isUser() {
        if (this.currentUser && this.currentUser.role === Role.User && this.c) {
            this.getAllOrderEmployee();
            this.c = 0
        }
        return this.currentUser && this.currentUser.role === Role.User;
    }
    open1() {
        const modalRef = this.modal.open(UpdateInfoComponent, { size: 'lg' })
        debugger
        modalRef.componentInstance.data = this.data;

        modalRef.result.then((result) => {
            if (result.avatar) {
                this.url = "http://localhost:4000/" + result.avatar;
            }
        }).catch((error) => {
        });

    }
    open2() {
        const modalRef = this.modal.open(ChangePasswordComponent, { size: 'lg' })
        debugger
        modalRef.componentInstance.user = this.currentUser;

        modalRef.result.then((result) => {
            console.log(result);
        }).catch((error) => {
        });

    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
