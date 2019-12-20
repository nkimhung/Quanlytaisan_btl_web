import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'warning-delete',
    templateUrl: './warning-delete.component.html',
    styleUrls: ['./warning-delete.component.css']
})
export class WarningDeleteComponent implements OnInit {

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
// JavaScript source code
