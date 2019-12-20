import { Component, OnInit } from '@angular/core';
import { ProductInfo } from '@/_models';
import { ProductInCart } from '@/_models';
import { ProductOrder } from '@/_models';
import { ProductService, SharedService, AuthenticationService } from '@/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoNotificationComponent } from '../notification/info-notification/info-notification.component';
@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

    public data: any = [];
    public dataProductInCart: any = [];  // productInCart
    productAddedTocart: any = [];
    orderDetail: any = [];  // productOrder
    quantity: number;
    public orderDetails: any = [];
    sortType = 'timeReturn';
    type = 'name'
    sortReverse = true;
    public types: any = [
        {
            type: 'Name',
            value: 'name'
        },
        {
            type: 'Date Created',
            value: 'dateCreated'
        }
    ];
    constructor(private productService: ProductService, private authenticationService: AuthenticationService, private modal: NgbModal) { }

    ngOnInit() {
        this.getAllMessageOrder();
        //this.productAddedTocart = this.productService.getProductFromCart();

        //this.productService.removeAllProductFromCart();
        //this.productService.addProductToCart(this.productAddedTocart);
    }

    getAllMessageOrder(): void {
        let id = this.authenticationService.currentUserValue.employeeID;
        this.productService.getMessageEmployee(id).subscribe((res: any) => {
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
            if (productorder.dateReturn < new Date().getTime()) productorder.msg = "Đã quá hạn";
            else {
               productorder.msg="Sắp đến hạn"
            }
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
        const modalRef = this.modal.open(InfoNotificationComponent, { size: 'lg' })
        modalRef.componentInstance.id = orderDetail.id;
        modalRef.result.then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
        console.log(modalRef.componentInstance.id)
        console.log(orderDetail.id);
    }
   


}
