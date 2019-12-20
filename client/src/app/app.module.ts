//import { NgModule } from '@angular/core';
import { NgModule} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
// used to create fake backend
// import { fakeBackendProvider } from './_helpers';
import { OrderModule } from 'ngx-order-pipe';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent, ChangeAvatarComponent } from './home';
import { UpdateInfoComponent } from './home/updateinfo/updateinfo.component'
import { AdminComponent, InfoEmployeeComponent, UpdateEmployeeComponent } from './admin';
import { LoginComponent } from './login';
import {RegisterComponent} from './register/register.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './admin/filter.pipe';
import { ViewProductComponent } from './list-product/view-product/view-product.component';
import { CreateProductComponent } from './list-product/create-product/create-product.component'
import { ListProductComponent } from './list-product/list-product.component'
import { UpdateProductComponent } from './list-product/update-product/update-product.component';
import { InfoNotificationComponent } from './notification/info-notification/info-notification.component';
import { ProductDisplayUserComponent } from './product-display-user/product-display-user.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { NotificationComponent } from './notification/notification.component';
import { WarningComponent } from './list-product/warning/warning.component';
import { WarningNotiComponent } from './notification/warningnoti/warningnoti.component';
import { ChangePasswordComponent } from './home/change-password/change-password.component';
import { MessageBorrowComponent } from './product-display-user/message-borrow/message-borrow.component';
import { WarningDeleteComponent } from './my-cart/warning-delete/warning-delete.component';
import { RevokeProductOrder } from './order-detail/revoke-product-order/revoke-product-order.component';
import { StatisticComponent } from './statistic/statistic.component';
import { GoogleChartsModule } from 'angular-google-charts';
@NgModule({
   imports: [
      NgbModule,
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      NgxPaginationModule,
      routing,
        FormsModule,
        OrderModule,
        GoogleChartsModule.forRoot()
   ],
   declarations: [
      AppComponent,
      HomeComponent,
      AdminComponent,
      LoginComponent,
      RegisterComponent,
      RegisterEmployeeComponent,
      FileSelectDirective,
       UpdateInfoComponent,
      UpdateEmployeeComponent,
      ChangeAvatarComponent,
      InfoEmployeeComponent,
      FilterPipe,
      ListProductComponent,
      CreateProductComponent,
      UpdateProductComponent,
      ViewProductComponent,
      InfoNotificationComponent,
      ProductDisplayUserComponent,
      MyCartComponent,
      OrderDetailComponent,
      NotificationComponent,
       WarningComponent,
       WarningNotiComponent,
       ChangePasswordComponent,
       WarningDeleteComponent,
       MessageBorrowComponent,
       RevokeProductOrder,
       StatisticComponent
   ],
   providers: [],
   entryComponents: [
       UpdateInfoComponent,
      InfoEmployeeComponent,
      UpdateEmployeeComponent,
      UpdateProductComponent,
      ChangeAvatarComponent,
       CreateProductComponent,
       ViewProductComponent,
       InfoNotificationComponent,
       WarningComponent,
       WarningNotiComponent,
       ChangePasswordComponent,
       MessageBorrowComponent,
       WarningDeleteComponent
   ],
   bootstrap: [
      AppComponent
   ]
})

export class AppModule { }
