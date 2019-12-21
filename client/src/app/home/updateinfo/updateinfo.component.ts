import { Component, OnInit, EventEmitter,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { EmployeeService } from '../../_services/employee.service';
import { ProductService } from '../../_services/product.service'
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { debug } from 'util';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-updateinfo',
    templateUrl: './updateinfo.component.html',
    styleUrls: ['./updateinfo.component.css']
})
export class UpdateInfoComponent implements OnInit {
    @Input() data: any;
    public jobStartDate = "";
    public jobEndDate = "";
    public birth = "";
    public error = "";
    public full = "";
    public message: any = {};
    public F = "";
    public B = "";
    public P = "";
    public JS = "";
    public JE = "";
    public image;
    public url = "http://localhost:4000/";

    public genders: any = [
        { gender: 'Nam' },
        { gender: 'Nữ' }
    ]
    public statuss: any = [
        { status: 'Active' },
        { status: 'Wait' },
        { status: 'Delete' }
    ]

    constructor(
        private auth: AuthenticationService,
        private router: Router,
        private employeeService: EmployeeService,
        private activeModal: NgbActiveModal,
        private productService: ProductService

    ) { }
    select(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[event.target.files.length - 1];
            this.image = file;
        }
    }
    registerEmployee() {
        //check fullName
        if (!this.full) {
            this.F = "err";
            this.message.F = "FullName không thể trống !";
            debugger
        } else {
            this.F = "";
            this.message.F = "";
        }
        //check birthDate
        if (!this.data.birthDate) {
            this.B = "err";
            this.message.B = "BirthDate không thể trống !"
        } else {
            this.B = "";
            this.message.B = "";
        }
        //check phone
        if (!this.data.phone) {
            this.P = "err";
            this.message.P = "Phone không thể trống !";
            debugger
        } else {
            this.P = "";
            this.message.P = "";
        }
        //check JobStartDate
        if (!this.data.jobStartDate) {
            this.JS = "err";
            this.message.JS = "JobStartDate không thể trống !"
        } else {
            this.JS = "";
            this.message.JS = "";
        }
        //check jobEndDate
        if (!this.data.jobEndDate) {
            this.JE = "err";
            this.message.JE = "JobEndDate không thể trống !"
        } else {
            this.JE = "";
            this.message.JE = "";
        }
        // stop here if form is invalid
        if (!this.data.phone || !this.data.birthDate || !this.full || !this.data.jobStartDate || !this.data.jobEndDate) {
            debugger
            this.error = "Không được bỏ trống các trường bôi đỏ !"
        } else {
            if (new Date(this.data.jobEndDate).getTime() <= new Date(this.data.jobStartDate).getTime()) {
                this.JE = "err";
                this.JS = "err";
                this.message.JE = "Ngày kết thúc phải sau ngày bắt đầu !";
                this.message.JS = "Ngày bắt đầu phải trước ngày kết thúc !"
                debugger
            }
            else {
                this.data.employeeId = this.data.id;
                this.data.birthDate = new Date(this.data.birthDate).getTime();
                this.data.jobEndDate = new Date(this.data.jobEndDate).getTime();
                this.data.jobStartDate = new Date(this.data.jobStartDate).getTime();
                console.log(this.data)
                this.data.createdBy = this.auth.currentUserValue.employeeID;
                const formData = new FormData();
                formData.append('file', this.image);
                if (this.image) {
                    this.data.fullName = this.full;
                    this.productService.update(formData).subscribe((data) => {
                        if (data.status != 200) {
                            this.error = "Lỗi server khi tải ảnh lên. Xin vui lòng thử lại!";

                        } else {
                            this.data.avatar = data.filename;
                            let avatar = this.data.avatar;
                            this.auth.updateEmployee(this.data).subscribe((data) => {
                                if (data.status != 200) {
                                    alert("Lỗi server vui lòng thử lại");
                                } else {
                                    console.log(avatar);
                                    this.close(avatar, this.data.fullName);
                                }
                            });
                        }
                    })}
                else {
                    this.data.fullName = this.full;
                    this.auth.updateEmployee(this.data).subscribe((data) => {
                        if (data.status != 200) {
                            alert("Lỗi server vui lòng thử lại");
                        } else {
                            this.close(0, this.data.fullName);
                        }
                    }
                    );

                }

                //    debugger

            }
        }
    }

    ngOnInit() {
        this.message = {
            F: "",
            B: "",
            P: "",
            JS: "",
            JE: "",
        }
            this.data.birthDate = this.formattedDate(new Date(this.data.birthDate * 1));
            this.data.jobStartDate = this.formattedDate(new Date(this.data.jobStartDate * 1));
        this.data.jobEndDate = this.formattedDate(new Date(this.data.jobEndDate * 1));
        debugger
        var a = this.data;
        this.url = this.url + this.data.avatar;
        this.full = this.data.fullName;

    }
    formattedDate(d) {
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day,].join('-');
    }
    close(avatar, fullName) {
        this.activeModal.close({ avatar, fullName });
    }
}
