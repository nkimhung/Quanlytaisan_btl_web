import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService, ProductService, AuthenticationService } from '@/_services';
import { HttpClient } from '@angular/common/http';
import { FormsModule, FormBuilder } from '@angular/forms';
const URL = 'http://localhost:4000/users/uploadAvatar';
import { ProductInfo } from '@/_models';
import { Router } from "@angular/router";
import { FileUploader, FileLikeObject } from 'ng2-file-upload/ng2-file-upload';
import { map } from 'rxjs/operators';
import { debug } from 'util';
@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {


    @Input() id: any;
    products: ProductInfo[];
    productByID: any = {};
    public N = "";
    public M = "";
    public T=""
    public error = "";
    public image: any;
    public url;
    message: any = {
        N: "",
        M: "",
        T: ""
    }
    public types: any = [
        { type: 'Công nghệ' },
        { type: 'Gia dụng' },
        { type: 'Điện tử' },
        {type: 'Khác'}
    ]
    public uploader: FileUploader = new FileUploader({
        url: 'http://localhost:4000/api/uploadAvatar',
        itemAlias: 'file'
  
    });

    constructor(private activeModal: NgbActiveModal, private userService: UserService, private productService: ProductService, private authenticationService: AuthenticationService, private router: Router,
        private http: HttpClient, private form: FormBuilder) {
     
    }
    select(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[event.target.files.length-1];
            this.image = file;
        }
    }

    ngOnInit() {
        this.productService.getProductById(this.id).subscribe((res: any) => {
            this.productByID = res.data;
            if (!this.productByID.image) {
                this.productByID.image = "";
            }
            else
                this.productByID.image = "http://localhost:4000/" + this.productByID.image;
            this.url = this.productByID.image;

        });
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            var b = response;
            var c = status;
            debugger

            console.log('FileUpload:uploaded:', item, status, response);
            alert('File uploaded successfully');
        };
        
    }
    uploads() {
        const formData = new FormData();
        formData.append('file', this.image);
        this.productService.update(formData).subscribe((data) => {
            console.log(data);
            debugger
        }
        );
    }
    updateProduct() {
        if (!this.productByID.name) {
            this.N= "error";
            this.message.N = "show";
        }
        else {
            this.N = "";
            this.message.N = "";
        }
        if (this.productByID.amountInWarehouse ==="" || this.productByID.amountInWarehouse < 0) {
            debugger
            this.M = "error";
            this.message.M = "show";
        }
        else {
            this.M = "";
            this.message.M = "";
        }
        if (!this.productByID.type) {
            this.T = "error";
            this.message.T = "show";
        }
        else {
            this.T = "";
            this.message.T = "";
        }
        if (this.T || this.N || this.M) {
            this.error = "Lỗi dữ liệu đầu vào vui lòng kiểm tra lại!"
        }
        else {
            const formData = new FormData();
            formData.append('file', this.image);
            if (this.image) {
                this.productService.update(formData).subscribe((data) => {
                    if (data.status != 200) {
                        this.error = "Lỗi server khi tải ảnh lên. Xin vui lòng thử lại!";

                    } else {
                        this.productByID.modifiedBy = this.authenticationService.currentUserValue.employeeID;
                        this.productByID.image = data.filename;
                        var a = this.productByID;
                        this.productService.updateProduct(this.productByID).subscribe((data) => {
                            if (data.status != 200) {
                                var a = data;
                                alert("Lỗi server vui lòng thử lại");
                            } else {
                                var a = data;
                                alert("Cập nhập thành công");
                                this.close();
                            }
                        }
                        );
                        debugger
                    }
                    this.error = "";
                });

            } else {
                this.productByID.image = this.productByID.image.slice(22);
                debugger
                this.productByID.modifiedBy = this.authenticationService.currentUserValue.employeeID;
                this.productService.updateProduct(this.productByID).subscribe((data) => {
                    if (data.status != 200) {
                        alert("Lỗi server vui lòng thử lại");
                    } else {
                        alert("Cập nhập thành công");
                        this.close();
                    }
                }
                );
            }
        }
        //this.data.employeeId = this.id;
        //this.productByID.employeeId = this.id;
        //this.productByID.birthDate = new Date(this.birthDate).getTime();
        //this.productByID.jobEndDate = new Date(this.jobEndDate).getTime();
        //this.productByID.jobStartDate = new Date(this.jobStartDate).getTime();
        //if (this.employeeById.jobEndDate < this.employeeById.jobStartDate) {
        //    this.error = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc!";
        //    this.JE = "boder";
        //    this.JE = "boder";
        //    this.message.JE = "Ngày kết thúc phải sau ngày bắt đầu!";
        //    this.message.JS = "Ngày bắt đầu phải trước ngày kết thúc!"
        //} else {
        //    //console.log(this.data)
        //    this.authenticationService.updateEmployee(this.employeeById).subscribe((data) => {
        //        if (data.status != 200) {
        //            return;
        //        } else {
        //            debugger
        //            alert("Cập nhập thành công nhấn nút refresh để hiển thị dữ liệu mới");
        //            this.close();
        //        }
        //    }
        //    );
        //}
    }
    
    //update(employees, employeeI) {
    //    employees = this.employees.map(employee => {
    //        if (employee.id = employeeI.employeeId)
    //            return employeeI;
    //        return employee;
    //    })
    //    return employees;
    //}
    //formattedDate(d) {
    //    let month = '' + (d.getMonth() + 1),
    //        day = '' + d.getDate(),
    //        year = d.getFullYear();
    //    if (month.length < 2) month = '0' + month;
    //    if (day.length < 2) day = '0' + day;
    //    return [year, month, day,].join('-');
    //}

    close() {
        this.activeModal.close("ok i fine");
    }

}
