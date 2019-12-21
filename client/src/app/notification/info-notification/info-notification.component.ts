import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '@/_services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-info-notification',
  templateUrl: './info-notification.component.html',
  styleUrls: ['./info-notification.component.css']
})
export class InfoNotificationComponent implements OnInit {

    @Input() id: any;
    @Input() ad: any;
    public url;
    info: any = {};
    no = "";
    constructor(private ProductService: ProductService, private activeModal: NgbActiveModal) { }

    ngOnInit() {
        this.ProductService.getAllInfoProductFromOrder(this.id).subscribe((res: any) => {
            debugger;
            console.log(this.id);
            this.info = res.data[0];
            this.info.dateCreated = this.formattedDate(new Date(this.info.timeCreated * 1));
            this.info.timeBorrow = this.formattedDate(new Date(this.info.dateBorrow * 1));
            this.info.timeReturn = this.formattedDate(new Date(this.info.dateReturn * 1));
            console.log(this.info.timeBorrow, this.info.timeReturn);
            var a = res;
            var b = this.info;
            debugger
            if (this.info.image)
                this.url = "http://localhost:4000/" + this.info.image;
            else
                this.url = "";
            if (this.info.amount > this.info.amountInWarehouse) {
                this.no = "no";
            } else {
                this.no = "";
            }
        })
       
        debugger
    }
    formattedDate(d) {
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }
    close() {
        this.activeModal.close("No");
    }
    close1() {
        this.activeModal.close("ACCEPT");
    }
    close2() {
        this.activeModal.close("DELETE");
    }

}
