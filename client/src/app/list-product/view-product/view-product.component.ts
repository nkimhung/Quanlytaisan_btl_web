import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {  ProductService} from '@/_services';
import { ProductInfo } from '@/_models';
@Component({
    selector: 'view-product',
    templateUrl: './view-product.component.html',
    styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {


    @Input() id: any;
    productByID: any = {};
    public url;

    constructor(private activeModal: NgbActiveModal, private productService: ProductService) {

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
            this.productByID.dateCreated = this.formattedDate(new Date(this.productByID.timeCreated * 1));
            this.productByID.lastUpdate = this.formattedDate(new Date(this.productByID.timeModified * 1));
            if (!this.productByID.amountInWarehouse) this.productByID.amountInWarehouse = 0;

        });

    }
    formattedDate(d) {
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month,day].join('-');
    }
    

    close() {
        this.activeModal.close("ok i fine");
    }

}
