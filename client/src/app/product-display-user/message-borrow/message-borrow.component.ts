import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService, ProductService, AuthenticationService } from '@/_services';
@Component({
    selector: 'message-borrow',
    templateUrl: './message-borrow.component.html',
    styleUrls: ['./message-borrow.component.css']
})
export class MessageBorrowComponent implements OnInit {

    @Input() info: any;
    public b;
    data = {
        dateBorrow: "",
        dateReturn: "",
        amount:1
    }
    public S = "";
    public E = "";
    public A = ""; 
    public error = "";
    message: any = {
        S: "",
        E: "",
        A:""
    }
    constructor(private activeModal: NgbActiveModal, private productService: ProductService) {

    }

    ngOnInit(
      
    ) {
        this.b = this.info}
    close() {
        this.activeModal.close("No");
    }
    borrow() {
       
        if (!this.data.dateBorrow) {
            this.S = "error";
            this.message.S = "Trường này không thể bỏ trống";
        } else {
            this.S = "";
            this.message.S = "";
        }
        if (!this.data.dateReturn) {
            this.E = "error";
            this.message.E = "Trường này không thể bỏ trống";
        } else {
            this.E = "";
            this.message.E = "";
        }
        if (!this.data.amount) {
            this.A = "error";
            this.message.A = "Trường này không thể bỏ trống";
        } else {
            this.A = "";
            this.message.A = "";
        }
        if (this.data.amount > this.info.amountInWarehouse) {
            this.A = "error";
            this.message.A = "Số lượng mượn phải nhỏ hơn số lượng kho hiện có";
        }
      
        
        if (!this.E && !this.A && !this.S) {
           
            let now = this.formattedDate(new Date());
            let checknow = new Date(now).getTime();
            let dateBorrow = new Date(this.data.dateBorrow).getTime();
            let dateReturn = new Date(this.data.dateReturn).getTime();
            if (dateBorrow >= dateReturn) {
                this.E = "error";
                this.message.E = "Ngày trả phải sau ngày mượn dự kiến";
                this.S = "error";
                this.message.S = "Ngày mượn phải trước ngày trả dự kiến";
            }
            if (new Date(this.data.dateBorrow).getTime() < checknow) {
                this.S = "error";
                this.message.S = "Ngày mượn phải ít nhất từ ngày hiện tại trở đi";
            }
            debugger
            if (!this.E && !this.A && !this.S) {
                var order = {
                    id: this.b.id,
                    employeeID: this.b.employeeID,
                    amount: this.data.amount,
                    dateBorrow: dateBorrow,
                    dateReturn: dateReturn,
                    name: this.info.name
                }
                console.log(this.b);
                console.log(order.employeeID);
                console.log(order);
                this.productService.registerProductOrder(order).subscribe((data) => {
                    
                    if (data.status != 200) {
                        alert("Lỗi server vui lòng thử lại");
                    } else {
                        let cart = {
                            productInfoID: order.id,
                            amount: order.amount,
                            timeCreated: data.data,
                            createdBy: order.employeeID
                        }
                        this.productService.registerProductInCart(cart).subscribe((data) => {
                            if (data.status != 200) {
                                alert("Lỗi")
                            } else
                                alert("ok")
                        })
       
                        this.close();
                    }
                    
                }
                );
                
            } else {
                this.error = "Lỗi thông tin tạo yêu cầu";
            }
        } else {
            this.error = "Lỗi thông tin tạo yêu cầu";
        }
        

    }
    formattedDate(d) {
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }
}
