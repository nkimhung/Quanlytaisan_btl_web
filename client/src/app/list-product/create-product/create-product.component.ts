import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { UserService, ProductService, AuthenticationService } from '@/_services';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public product: any = {};
  public image: any;
  public types: any = [
    { type: 'Công nghệ' },
    { type: 'Gia dụng' },
      { type: 'Điện tử' },
      { type: 'Khác' }]
   public N = "";
      public M = "";
      public T = ""
    public error = "";
      message: any = {
          N: "",
          M: "",
          T: ""
      }
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:4000/users/uploadAvatar' });

    constructor(private activeModal: NgbActiveModal, private router: Router, private productService: ProductService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      console.log("----------- file : ", file);
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any) => {
      this.image = JSON.parse(response).file;
      console.log('Uploaded File Details:', JSON.parse(response));
      console.log(this.image);
      // this.toastr.success('File successfully uploaded!');
    };
      this.product = {
          image: "",
          name: "",
          description: "",
          type: "Công nghệ",
          amountInWarehouse:""
      }
  }

    createProduct() {
        if (!this.product.name) {
            this.N = "error";
            this.message.N = "show";
        }
        else {
            this.N = "";
            this.message.N = "";
        }
        if (!this.product.amountInWarehouse|| this.product.amountInWarehouse < 0) {
            this.M = "error";
            this.message.M = "show";
        }
        else {
            this.M = "";
            this.message.M = "";
        }
        if (!this.product.type) {
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
                        this.product.timeCreated = new Date().getTime();
                        this.product.timeModified = this.product.timeCreated;
                        this.product.modifiedBy = this.authenticationService.currentUserValue.employeeID;
                        this.product.createdBy = this.authenticationService.currentUserValue.employeeID;
                        this.product.image = data.filename;
                        var a = this.product;
                        debugger
                        this.productService.registerProduct(this.product).subscribe((data) => {
                            if (data.status != 200) {
                                var a = data;
                                alert("Lỗi server vui lòng thử lại");
                            } else {
                                var a = data;
                                alert("Tạo mới thành công");
                                this.close();
                            }
                        }
                        );
                        debugger
                    }
                    this.error = "";
                });

            } else {
                this.product.timeCreated = new Date().getTime();
                this.product.modifiedBy = this.authenticationService.currentUserValue.employeeID;
                this.product.timeModified = this.product.timeCreated;
                this.product.createdBy = this.authenticationService.currentUserValue.employeeID;
                this.productService.registerProduct(this.product).subscribe((data) => {
                    if (data.status != 200) {
                        alert("Lỗi server vui lòng thử lại");
                    } else {
                        alert("Tạo mới thành công thành công");
                        this.close();
                    }
                }
                );
            }
        }

    }
    select(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[event.target.files.length - 1];
            this.image = file;
        }
    }

  // updateEPL() {
  //   let payload = {
  //     image: this.image
  //   }
  //   console.log(payload);
  //   this.productService.registerProduct(payload).subscribe((data) => {
  //     if (data.status != 200) {
  //       return;
  //     }
  //     alert("tao moi anh thanh cong !");
  //     this.close();
  //   }
  //   );
  // }

  close() {
    this.activeModal.close();
  }

}
