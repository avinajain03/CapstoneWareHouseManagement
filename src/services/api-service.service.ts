import { Injectable } from '@angular/core';
import { inventory } from 'src/models/inventory';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { users } from 'src/models/users';
import { forkJoin, map } from 'rxjs';
import { inventoryDTO } from 'src/models/inventoryDTO';
import { vendorOrder } from 'src/models/vendorOrder';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  inventoryDisplayed: inventory[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/plain, */*',
      'Content-Type': 'application/json'
    }),
    responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient, private userService: UserService) { }

  fetchInventoryData(): Observable<inventory[]> {
    return this.http.get<inventory[]>(`http://localhost:8080/inventory`);
  }

  fetchEmployeeData(): Observable<users[]> {
    const adminUsers$ = this.http.get<users[]>('http://localhost:8080/users/role/admin');
    const staffUsers$ = this.http.get<users[]>('http://localhost:8080/users/role/staff');

    return forkJoin([adminUsers$, staffUsers$]).pipe(
      map(usersArrays => ([] as Array<users>).concat(...usersArrays))
    );
  }


  fetchSupplierData(): Observable<users[]> {
    return this.http.get<users[]>(`http://localhost:8080/users/role/supplier`)
  }

 
  getAllProducts(): Observable<inventoryDTO[]> {
    const url = `http://localhost:8080/product`;
    console.warn(this.http.get<inventoryDTO[]>(url));
    return this.http.get<inventoryDTO[]>(url);
  }

  addToCart(product: inventoryDTO): Observable<any> {
    const url = `http://localhost:8080/addToCart`;
    return this.http.post<vendorOrder>(url, product);
  }

  getAllOrders(): Observable<vendorOrder[]> {
    const url = `http://localhost:8080/getAllOrders`;
    return this.http.get<vendorOrder[]>(url);
  }


  deleteOrder(vendorOrderId: String) {
    const url = `http://localhost:8080/delete/${vendorOrderId}`;
    const abc = this.http.delete<String>(url, this.httpOptions);
    console.log(abc);
    return abc;

  }

  updateVendorOrder(order: vendorOrder): Observable<String> {
    const url = `http://localhost:8080/updateVendorOrder/${order.vendorOrderId}`;
    console.log(url);
    const abc = this.http.put<String>(url, order, this.httpOptions);
    console.log(abc.subscribe({
      next: (res) => { console.log(res); },
      error: (er) => { console.warn(er.message); },
      complete: () => { console.log("Completed in Apiservice") }

    }));
    return abc;
  }

  updateInventory(productId: String, quantity: number): Observable<String> {
    const url = `http://localhost:8080/updateInventory/${productId}/${quantity}`;
    const abc = this.http.put<String>(url, null, this.httpOptions);
    console.log(abc);
    return abc;
  }

  fetchSupplierDetails(): Observable<users[]> {
    const userId = this.userService.getUser();
    console.log('Supplier details id', userId);

    const url = `http://localhost:8080/users/${userId}`;
    console.log('type', typeof (this.http.get<users[]>(url, this.httpOptions)));

    return this.http.get<users[]>(url, this.httpOptions);
  }

  fetchSupplierName(): Observable<string> {
    const url = `http://localhost:8080/users/supplierName/${this.userService.getUser()}`;
    return this.http.get<string>(url, this.httpOptions);
  }

  fetchSupplierProducts(supplierName: string): Observable<inventory[]> {
    const url = `http://localhost:8080/inventory/supplierProducts/${supplierName}`;
    return this.http.get<inventory[]>(url);
  }

  updateProductQuantity(productId: String, quantity: number): Observable<String> {
    const url = `http://localhost:8080/inventory/${productId}/${quantity}`;
    return this.http.post<String>(url, null, this.httpOptions);
  }

  fetchVendorData(): Observable<users[]> {
    return this.http.get<users[]>(`http://localhost:8080/users/role/vendor`)
  }

  addStaffData(staff: users): Observable<String> {
    const url = 'http://localhost:8080/users/staff';
    const abc = this.http.post<String>(url, staff, this.httpOptions);
    console.log(abc);
    return abc;

  }

  addInventory(product: inventory): Observable<String> {
    const url = `http://localhost:8080/addInventory`;
    const abc = this.http.post<String>(url, product, this.httpOptions);
    console.log(abc);
    return abc;
  }

}
