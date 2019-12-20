import { Component, OnInit, Input } from '@angular/core';
import { ProductService, EmployeeService } from '@/_services';
import { ProductInfo } from '@/_models';
import { GoogleChartsModule } from 'angular-google-charts';
@Component({
    selector: 'statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit{
    public amountBorrowG = 0;
    public amountBorrowC = 0;
    public amountBorrowK =0;
    public amountBorrowD = 0;
    public amountHouseG = 0;
    public amountHouseC = 0;
    public amountHouseK = 0;
    public amountHouseD = 0;
    public url;
    public title = 'Thống kê tình hình các loại sản phẩm';
    public type = 'ComboChart';
    public data = [
        ["công nghệ", 0, 0, 0],
        ["điện tử", 0, 0, 0],
        ["gia dụng",0, 0, 0],
        ["khác", 0, 0, 0]
    ];
    public columnNames = ['Số lượng', 'Còn trong kho', 'Tổng số lượng', 'Đang mượn'];
    public options = {
        hAxis: {
            title: 'Loại sản phẩm'
        },
        vAxis: {
            title: 'Số lượng'
        },
        seriesType: 'bars',
        series: { 2: { type: 'line' } }
    };
    public width = 800;
    public height = 400;
    constructor(private productService: ProductService, private employeeService: EmployeeService) {
       
    }

    ngOnInit() {
        this.getStatistic();
        
    }
    getStatistic() {
        this.employeeService.getStatistic().subscribe((res: any) => {
            console.log(res);
            if (res.status != 200) {
                console.log(res.msg);
                return;
            }
            this.getamount(res.data.mount);
            this.getamountHouse(res.data.amountinwarehouse);
            debugger
            
        });
    }
    getamount(datas: any[]) {
        datas.map((amount) => {
            this.amount(amount);
        })
        this.data = [
            ["công nghệ", this.amountHouseC, this.amountBorrowC + this.amountHouseC, this.amountBorrowC],
            ["điện tử", this.amountHouseD, this.amountBorrowD + this.amountHouseD, this.amountBorrowD],
            ["gia dụng", this.amountHouseG, this.amountBorrowG + this.amountHouseG, this.amountBorrowG],
            ["khác", this.amountHouseK, this.amountBorrowK + this.amountHouseK, this.amountBorrowK]
        ]
    }
    getamountHouse(datas) {
        debugger
        datas.map((amount) => {
            this.amounthouse(amount);
        })
        this.data = [
            ["công nghệ", this.amountHouseC, this.amountBorrowC + this.amountHouseC, this.amountBorrowC],
            ["điện tử", this.amountHouseD, this.amountBorrowD + this.amountHouseD, this.amountBorrowD],
            ["gia dụng", this.amountHouseG, this.amountBorrowG + this.amountHouseG, this.amountBorrowG],
            ["khác", this.amountHouseK, this.amountBorrowK + this.amountHouseK, this.amountBorrowK]
        ]
        console.log(this.data);
        debugger
    }
    amount(mount) {
        switch (mount.type) {
            case 'Gia dụng':
                this.amountBorrowG += mount.amount*1
                break
            case 'Điện tử':
                this.amountBorrowD += mount.amount*1
                break
            case 'Công nghệ':
                this.amountBorrowC += mount.amount*1
                break
            case 'Khác':
                this.amountBorrowK += mount.amount*1
                break
        }
    }
    amounthouse(amounthouse) {
        switch (amounthouse.type) {
            case 'Gia dụng':
                this.amountHouseG += amounthouse.amountInWarehouse*1
                break
            case 'Điện tử':
                this.amountHouseD += amounthouse.amountInWarehouse*1
                break
            case 'Công nghệ':
                this.amountHouseC += amounthouse.amountInWarehouse*1
                break
            case 'Khác':
                this.amountHouseK += amounthouse.amountInWarehouse*1
                break
        }
    }
    

}
