import { Component, OnInit } from '@angular/core';
import { ProductInfo } from '@/_models';
import { ProductInCart } from '@/_models';
import { ProductOrder } from '@/_models';
import { ProductService, SharedService, AuthenticationService } from '@/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarningDeleteComponent } from '../../my-cart/warning-delete/warning-delete.component';
import { InfoOrderComponent } from '../info-order/infoorder.component';
@Component({
    selector: 'revoke-product-order',
    templateUrl: './revoke-product-order.component.html',
    styleUrls: ['./revoke-product-order.component.css']
})
export class RevokeProductOrder implements OnInit {

    public data: any = [];
    public dataProductInCart: any = [];  // productInCart
    productAddedTocart: any = [];
    orderDetail: any = [];  // productOrder
    quantity: number;
    public orderDetails: any = [];
    sortType = 'dateReturn';
    sortReverse = false;
    public type = 'id';
    public types: any = [
        {
            type: 'Code',
            value:'id'
        },
        {
            type: 'Name',
            value: 'name'
        },
        {
            type: 'Amount',
            value: 'amount'
        },
        {
            type: 'Time Created',
            value: 'timeCreated'
        },
        {
            type: 'Date Borrow',
            value: 'dateBorrow'
        },
        {
            type: 'Date Return',
            value: 'dateReturn'
        }
    ]
    constructor(private productService: ProductService, private authenticationService: AuthenticationService, private modal: NgbModal) { }

    ngOnInit() {
        this.getAllProductOrder();
        //this.productAddedTocart = this.productService.getProductFromCart();

        //this.productService.removeAllProductFromCart();
        //this.productService.addProductToCart(this.productAddedTocart);
    }

    getAllProductOrder(): void {
        let id = this.authenticationService.currentUserValue.employeeID;
        this.productService.getAllOrderAccept().subscribe((res: any) => {
            console.log(res);
            if (res.status != 200) {
                console.log(res.msg);
                return;
            }
            this.orderDetails = this.format(res.data);
        });
    };
    format(productorders) {
        productorders = productorders.map(productorder => {
            productorder.dateCreated = this.formattedDate(new Date(productorder.timeCreated * 1));
            productorder.timeBorrow = this.formattedDate(new Date(productorder.dateBorrow * 1));
            productorder.timeReturn = this.formattedDate(new Date(productorder.dateReturn * 1));
            return productorder;
        })
        return productorders;
    }
    formattedDate(d) {
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [day, month, year].join('/');
    }
    summit() {
        // this.dataProductInCart.status = "WAIT";
        // for (var i = 0; i <= this.productAddedTocart.length; i++) {
        //   return this.dataProductInCart.productInfoID = this.productAddedTocart[i].id;
        // }
        // for (var i = 0; i <= this.productAddedTocart.length; i++) {
        // console.log(this.productAddedTocart[i].id);
        // }

        this.dataProductInCart = [];
        for (let i in this.productAddedTocart) {
            for (let y in this.orderDetail) {
                this.dataProductInCart.push({
                    productOrderID: this.orderDetail[y].id,
                    productInfoID: this.productAddedTocart[i].id,
                    amount: this.productAddedTocart[i].quantity,
                    timeModified: null,
                    createdBy: null,
                    modifiedBy: null
                });
            }
        }
        console.log(this.dataProductInCart);

        this.productService.registerProductInCart(this.dataProductInCart).subscribe((data) => {
            if (data.status != 200) {
                return;
            }
            alert("tao moi thanh cong !");
        }
        );
    }
    openPopup1(orderDetail) {
        const modalRef = this.modal.open(InfoOrderComponent, { size: 'lg' })
        modalRef.componentInstance.id = orderDetail.id;
        modalRef.result.then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
        console.log(modalRef.componentInstance.id)
        console.log(orderDetail.id);
    }
    openWaring(orderDetail) {
        const modalRef = this.modal.open(WarningDeleteComponent, { size: 'lg' });
        let data = orderDetail;
        modalRef.componentInstance.name = "nhận lại sản phẩm" + "'" + orderDetail.name+"' về kho";
        modalRef.result.then((result) => {
            if (result == "Yes") {
                console.log(orderDetail);
                debugger
                this.productService.revoke(data).subscribe((data) => {
                    if (data.status != 200) {
                        alert ("Lỗi server khi tải ảnh lên. Xin vui lòng thử lại!");

                    } else {
                  
                        alert("Cập nhập thành công");
                        this.getAllProductOrder();
                            }
                       });
            }
        }).catch((error) => {
            console.log(error);
        });
        console.log(modalRef.componentInstance.id)
        console.log(orderDetail.id);
    }
   


}

