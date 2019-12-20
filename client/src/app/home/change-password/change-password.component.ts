import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../_services/authentication.service';
@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    @Input() user: any;
    public data = {
        password: "",
        newPassword: "",
        retypePassword:""
    };
    public N = "";
    public P = "";
    public R = "";
    message: any = {
        N: "",
        P: "",
        R:""
    }
    public error = "";
    constructor(private activeModal: NgbActiveModal, private auth: AuthenticationService) {

    }

    ngOnInit() { }
    close() {
        this.activeModal.close("No");
    }
    Update() {
        if (!this.data.password) {
            this.P = "error";
            this.message.P = "Password không thể trống ";
        }
        else {
            this.P = "";
            this.message.P = "";
        }
        if (!this.data.newPassword) {
            this.N = "error";
            this.message.N = "New password không thể trống";
        }
        else {
            this.N = "";
            this.message.N = "";
        }
        if (!this.data.retypePassword || this.data.retypePassword != this.data.newPassword) {
            this.R = "error";
            this.message.R = "Không trùng khớp";
        }
        else {
            this.R = "";
            this.message.R = "";
        }
        debugger
        if (!this.N && !this.P && !this.R) {
            let a = {
                id: this.user.id,
                username: this.user.username,
                password: this.data.password,
                newPassword: this.data.newPassword
            };
            this.auth.changePassword(a).subscribe(
                (data) => {
                    if (data.status != 200) {
                        this.P = "error";
                        this.message.P = data.err;
                        this.error = data.err;
                    } else {
                        this.error = "ok";
                    }
                },
                err => {
                    debugger
                }
            );
        }
        else {
            debugger
        }
        
    }
}
// JavaScript source code
