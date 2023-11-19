import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';
import { EmployeesComponent } from 'src/components/employees/employees.component';
import { HomeComponent } from 'src/components/home/home.component';
import { InventoryComponent } from 'src/components/inventory/inventory.component';
import { LoginComponent } from 'src/components/login/login.component';
import { OrderComponent } from 'src/components/order/order.component';
import { ProductsComponent } from 'src/components/products/products.component';
import { RegisterComponent } from 'src/components/register/register.component';
import { SignupComponent } from 'src/components/signup/signup.component';
import { StaffInventoryComponent } from 'src/components/staff-inventory/staff-inventory.component';
import { SupplierDetailsComponent } from 'src/components/supplier-details/supplier-details.component';
import { SupplierProductsComponent } from 'src/components/supplier-products/supplier-products.component';
import { SuppliersComponent } from 'src/components/suppliers/suppliers.component';
import { TotalOrdersComponent } from 'src/components/total-orders/total-orders.component';
import { VendorsComponent } from 'src/components/vendors/vendors.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'login',
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "inventory",
    component: InventoryComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent
  },
  {
    path:"employees",
    component: EmployeesComponent
  },
  {
    path:"suppliers",
    component: SuppliersComponent
  },
  {
    path:"products",
    component: ProductsComponent
  },
  {
    path:"orders",
    component: OrderComponent
  }, 
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"supplierDetails",
    component:SupplierDetailsComponent
  },
  {
    path:"supplierProducts",
    component:SupplierProductsComponent
  },
  {
    path:"vendors",
    component:VendorsComponent
  },
  {
    path:"totalOrder",
    component:TotalOrdersComponent
  },
  {
    path:"staffInventory",
    component:StaffInventoryComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
