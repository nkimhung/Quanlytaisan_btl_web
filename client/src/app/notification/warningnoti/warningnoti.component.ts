import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'waring',
    templateUrl: './warningnoti.component.html',
    styleUrls: ['./warningnoti.component.css']
})
export class WarningNotiComponent implements OnInit {

    @Input() name: any;
    constructor(private activeModal: NgbActiveModal) {

    }

    ngOnInit() { }
    close() {
        this.activeModal.close("No");
    }
    close1() {
        this.activeModal.close("Yes");
    }
}
