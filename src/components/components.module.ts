import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InventoryComponent } from './inventory/inventory.component';
import { TopbarComponent } from './topbar/topbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'src/material/material.module';

import { EmployeesComponent } from './employees/employees.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { OrderComponent } from './order/order.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgChartsModule } from 'ng2-charts';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { SupplierProductsComponent } from './supplier-products/supplier-products.component';
import { VendorsComponent } from './vendors/vendors.component';
import { TotalOrdersComponent } from './total-orders/total-orders.component';
import { StaffInventoryComponent } from './staff-inventory/staff-inventory.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';







@NgModule({
  declarations: [
    SidebarComponent,
    InventoryComponent, 
    TopbarComponent, 
    DashboardComponent, 
    EmployeesComponent, 
    SuppliersComponent, 
    AddStaffComponent, 
    ProductsComponent, 
    OrderComponent, 
    LoginComponent, 
    SignupComponent, 
    RegisterComponent, 
    HomeComponent, 
    SupplierDetailsComponent, 
    SupplierProductsComponent, 
    VendorsComponent, 
    TotalOrdersComponent, 
    StaffInventoryComponent, 
    AddInventoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    PaginatorModule,
    CardModule,
    MaterialModule,
    AppRoutingModule,
    NgChartsModule


  ],
  exports: [
    SidebarComponent,
    InventoryComponent,
    TopbarComponent,
    DashboardComponent,
    AddStaffComponent,
    ProductsComponent,
    OrderComponent,
    LoginComponent,
    SignupComponent,
    RegisterComponent,
    HomeComponent,
    SupplierDetailsComponent,
    SupplierProductsComponent,
    VendorsComponent,

    TotalOrdersComponent,
    StaffInventoryComponent,
    AddInventoryComponent
    


  ]
})
export class ComponentsModule { }
