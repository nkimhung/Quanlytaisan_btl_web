import { Component, OnInit } from '@angular/core';

import { ProductService, SharedService } from '@/_services';
import { AuthenticationService } from '../_services';
import { ProductInfo } from '@/_models';
import { ProductInCart } from '@/_models';
import { ProductOrder } from '@/_models'
import { User, Role } from '../_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageBorrowComponent } from './message-borrow/message-borrow.component';
import { ViewProductComponent } from '../list-product/view-product/view-product.component'
@Component({
  selector: 'app-product-display-user',
    templateUrl: './product-display-user.component.html',
    styleUrls: ['./product-display-user.component.css']
})
export class ProductDisplayUserComponent implements OnInit {

  public products: ProductInfo[];
  public productAddedToCart: ProductInCart[];
    public cartItemCount: number = 0;
    public type = 'name';
    public types: any = [
        {
            type: 'Name',
            value: 'name'
        },
        {
            type: 'Type',
            value: 'type'
        }
    ];
    constructor(private productService: ProductService, private sharedService: SharedService, private auth: AuthenticationService
        , private modal: NgbModal
    ) { }

  ngOnInit() {
      this.getAllProduct();

    localStorage.setItem("product", JSON.stringify([]));
  }

  getAllProduct(): void {
    this.productService.getAllProduct().subscribe((res: any) => {
      var newArray = res.data.filter(function (el) {
        return el.image ;
      });
      console.log(newArray)
      if (res.status != 200) {
        console.log(res.msg);
        return;
      }
      this.products = newArray;
      console.log(res);
    });
  };


    OnAddCart(product) {
        let info = {
            id: product.id,
            amountInWarehouse: product.amountInWarehouse,
            employeeID: this.auth.currentUserValue.employeeID,
            name:product.name
        };
        console.log(info);
        const modalRef = this.modal.open(MessageBorrowComponent, { size: 'lg' })
        modalRef.componentInstance.info = info;

        modalRef.result.then((result) => {
        }).catch((error) => {
        });
    }
    openView(product) {
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
}
