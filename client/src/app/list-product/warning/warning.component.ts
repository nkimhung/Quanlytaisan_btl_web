import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'waring',
    templateUrl: './warning.component.html',
    styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {

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
