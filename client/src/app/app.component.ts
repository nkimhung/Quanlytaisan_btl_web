import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateInfoComponent } from './home/updateinfo/updateinfo.component';
import { ChangePasswordComponent } from './home/change-password/change-password.component'
import { InfoNotificationComponent } from './notification/info-notification/info-notification.component'
import { AuthenticationService, SharedService, ProductService, EmployeeService } from './_services';
import { User, Role } from './_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debug } from 'util';

@Component({ selector: 'app', templateUrl: 'app.component.html', styleUrls: ['./app.component.css'] })
export class AppComponent {
    currentUser: User;

    public orderDetails: any[];
    public oDs: any[];
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
                    else {
                        this.url = "http://localhost:4000/file-1576927716752";
                        this.data.avatar = "file-1576927716752";
                    }
                

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
            this.orderDetails = res.data;
            this.orderDetails = this.format();
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
            this.oDs = res.data
            this.oDs = this.format2();
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
        this.getAllOrderDetail();
        this.c = 1;
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    format() {
        let productorders = this.orderDetails.map(productorder => {
            productorder.dateCreated = this.formattedDate(new Date(productorder.timeCreated * 1));
            productorder.timeBorrow = this.formattedDate(new Date(productorder.dateBorrow * 1));
            productorder.timeReturn = this.formattedDate(new Date(productorder.dateReturn * 1));
            return productorder;
        })
        return productorders;
    }
    format2() {
        let productorders = this.oDs.map(productorder => {
            productorder.dateCreated = this.formattedDate(new Date(productorder.timeCreated * 1));
            productorder.timeBorrow = this.formattedDate(new Date(productorder.dateBorrow * 1));
            productorder.timeReturn = this.formattedDate(new Date(productorder.dateReturn * 1));
            productorder.modi = this.formattedDate(new Date(productorder.timeModified*1))
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            day = day + 2;
            let check = new Date(year, month, day).getTime();
            productorder.msg="vừa được phê duyệt"
            if (check > productorder.dateReturn) productorder.msg = "sắp đến hạn trả";
            if (productorder.timeReturn > date.getTime()) productorder.msg = "quá hạn";
            return productorder;
        })
        return productorders;
    }
    openPopup1(orderDetail) {
        debugger
        const modalRef = this.modal.open(InfoNotificationComponent, { size: 'lg' })
        modalRef.componentInstance.id = orderDetail.id;
        modalRef.componentInstance.ad = true;
        modalRef.result.then((result) => {
            if (result == "ACCEPT") {
                let data = {
                    id: orderDetail.id,
                    employeeIDresponse: this.authenticationService.currentUserValue.employeeID,
                    status: "ACCEPT"
                };
                console.log(data);
                debugger
                this.productService.updateStatus(data).subscribe((data) => {
                    debugger
                    if (data.status != 200) {

                        alert("Loi server !");
                        return;

                    }
                    alert("Cập nhập thành công !");
                    this.getAllOrderDetail();
                }
                );

            } else {
                if (result == "DELETE") {
                    let data = {
                        id: orderDetail.id,
                        employeeIDresponse: this.authenticationService.currentUserValue.employeeID,
                        status: "DELETE"
                    };
                    debugger
                this.productService.updateStatus(data).subscribe((data) => {
                    debugger
                    if (data.status != 200) {

                        alert("Loi server !");
                        return;

                    }
                    alert("Cập nhập thành công !");
                    this.getAllOrderDetail();
                }
                );
            }
        }
        }).catch((error) => {
            console.log(error);
        });
        console.log(modalRef.componentInstance.id)
        console.log(orderDetail.id);
    }
    openPopup2(orderDetail) {
        debugger
        const modalRef = this.modal.open(InfoNotificationComponent, { size: 'lg' })
        modalRef.componentInstance.id = orderDetail.id;
        modalRef.componentInstance.ad = false;
        modalRef.result.then((result) => {
            
        }).catch((error) => {
            console.log(error);
        });
        console.log(modalRef.componentInstance.id)
        console.log(orderDetail.id);
    }
    formattedDate(d) {
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [day, month, year].join('/');
    }
}
