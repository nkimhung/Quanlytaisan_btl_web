import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '@/_services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-info-order',
    templateUrl: './infoorder.component.html',
    styleUrls: ['./infoorder.component.css']
})
export class InfoOrderComponent implements OnInit {

    @Input() id: any;
    public url;
    info: any = {};

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
        })
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

}
