import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { ListProductComponent } from './list-product/list-product.component';
import { AuthGuard } from './_guards';
import { RegisterComponent } from './register/register.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { ProductDisplayUserComponent } from './product-display-user/product-display-user.component';
import { Role } from './_models';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { NotificationComponent } from './notification/notification.component';
import { RevokeProductOrder } from './order-detail/revoke-product-order/revoke-product-order.component';
import { StatisticComponent } from './statistic/statistic.component'

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'notification',
        component: NotificationComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'statistic',
        component: StatisticComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'revoke',
        component: RevokeProductOrder,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'myCart',
        component: MyCartComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.User] }
    },
    {
        path: 'product-user',
        component: ProductDisplayUserComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.User] }
    },
    {
        path: 'product-order',
        component: OrderDetailComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.User] }
    },
    {
        path: 'product',
        component: ListProductComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'register-employee',
        component: RegisterEmployeeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
