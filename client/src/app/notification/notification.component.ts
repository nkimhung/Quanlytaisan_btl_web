import { Component, OnInit } from '@angular/core';

import { ProductService } from '@/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoNotificationComponent } from './info-notification/info-notification.component';
import { WarningNotiComponent } from './warningnoti/warningnoti.component'
import { AuthenticationService } from '../_services';
import { ProductInfo } from '@/_models';
import { User, Role } from '../_models';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public orderDetails: any = [];
  public data: any = {};
    sortType = 'name';
    type = 'name'
    sortReverse = false;
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
    constructor(private productService: ProductService, private modal: NgbModal, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getAllOrderDetail();
  }

  getAllOrderDetail(): void {
    this.productService.getAllOrderDetail().subscribe((res: any) => {
      if (res.status != 200) {
        return;
        }
        debugger
        this.orderDetails = res.data;
        this.orderDetails = this.format(this.orderDetails);
        console.log(this.orderDetails);
    });
  };
    format(productorders) {
        productorders = this.orderDetails.map(productorder=> {
            productorder.dateCreated = this.formattedDate(new Date(productorder.timeCreated * 1));
            productorder.timeBorrow = this.formattedDate(new Date(productorder.dateBorrow * 1));
            productorder.timeReturn = this.formattedDate(new Date(productorder.dateReturn * 1));
            return productorder;
        })
        return productorders;
    }
    openPopup4(product) {
        
    }
    updateStatusOrderDetail(orderDetail) {
        const modalRef = this.modal.open(WarningNotiComponent, { centered: true })
        modalRef.componentInstance.name = 'xác nhận';

        modalRef.result.then((result) => {
            if (result == "Yes") {
                this.data.id = orderDetail.id;
                this.data.employeeIDresponse = this.authenticationService.currentUserValue.employeeID;
                console.log(this.data);
                this.data.status="ACCEPT"
                debugger
                this.productService.updateStatus(this.data).subscribe((data) => {
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
        })
      
    }
    delete(orderDetail) {
        const modalRef = this.modal.open(WarningNotiComponent, { centered: true })
        modalRef.componentInstance.name = 'Delete';

        modalRef.result.then((result) => {
            if (result == "Yes") {
                this.data.id = orderDetail.id;
                this.data.employeeIDresponse = this.authenticationService.currentUserValue.employeeID;
                console.log(this.data);
                this.data.status = "Delete";
                debugger
                this.productService.updateStatus(this.data).subscribe((data) => {
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
        })
    }

  openPopup1(orderDetail) {
    const modalRef = this.modal.open(InfoNotificationComponent, { size: 'lg'})
    modalRef.componentInstance.id = orderDetail.id;
    modalRef.result.then((result) => {
        console.log(result);
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
