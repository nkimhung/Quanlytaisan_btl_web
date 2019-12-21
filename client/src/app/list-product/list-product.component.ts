import { Component, OnInit } from '@angular/core';

import { ProductService } from '@/_services';
import { AuthenticationService } from '../_services';
import { ProductInfo } from '@/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ViewProductComponent } from './view-product/view-product.component'
import { User, Role } from '../_models';
import { OrderModule } from 'ngx-order-pipe';
import { WarningComponent } from './warning/warning.component';
import { debug } from 'util';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: ProductInfo[];
    currentUser: User;
    sortType = 'name';
    type='name'
    sortReverse = false;
    public types: any = [
        {
            type: 'Name',
            value: 'name'
        },
        {
            type: 'Date Created',
            value: 'dateCreated'
        },
        {
            type: 'Last Update',
            value: 'lastUpdate'
        },
        {
            type: 'Amount In Ware House',
            value: 'amountInWarehouse'
        }
    ];

  constructor(private productService: ProductService, private modal: NgbModal, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct(): void {
    this.productService.getAllProduct().subscribe((res: any) => {
      console.log(res);
      if (res.status != 200) {
        console.log(res.msg);
        return;
      }
        this.products = res.data;
        this.products = this.format(this.products);
      console.log(res);
    });
  };

  openPopup1() {
    this.modal.open(CreateProductComponent, {
      size: 'lg',
    }).result.then(res => {
        this.getAllProduct();
    })
  }
  openPopup2(product) {
      const modalRef = this.modal.open(UpdateProductComponent, { size: 'lg' })
      modalRef.componentInstance.id = product.id;

      modalRef.result.then((result) => {
          debugger
          this.getAllProduct();
      }).catch((error) => {
          console.log(error);
          debugger
      });
  }
    openPopup3(product) {
        const modalRef = this.modal.open(ViewProductComponent, { size: 'lg' })
        modalRef.componentInstance.id = product.id;

        modalRef.result.then((result) => {
            debugger
            this.getAllProduct();
        }).catch((error) => {
            console.log(error);
            debugger
        });
    }
    openPopup4(product) {
        const modalRef = this.modal.open(WarningComponent, { centered: true })
        modalRef.componentInstance.name = product.name;

        modalRef.result.then((result) => {
            if (result == "Yes") {
                this.authenticationService.DeleteProductById(product.id).subscribe(
                    (res) => {
                        if (res.status != 200) {
                            alert(res.err)
                        } else {
                            alert('Xóa thành công')
                            this.getAllProduct();
                        }
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        })
    }
    format(product) {
        product = this.products.map(product => {
            product.dateCreated = this.formattedDate(new Date(product.timeCreated * 1));
            product.lastUpdate = this.formattedDate(new Date(product.timeModified * 1));
            if (!product.amountInWarehouse) product.amountInWarehouse = 0;
            return product;
        })
        return product;
    }
    formattedDate(d) {
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [day, month, year,].join('/');
    }


  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isUser() {
    return this.currentUser && this.currentUser.role === Role.User;
  }


}
