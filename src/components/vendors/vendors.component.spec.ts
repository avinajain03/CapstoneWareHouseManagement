import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { VendorsComponent } from './vendors.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiServiceService } from 'src/services/api-service.service';
import { users } from 'src/models/users';
import { of } from 'rxjs';

describe('VendorsComponent', () => {
  let component: VendorsComponent;
  let fixture: ComponentFixture<VendorsComponent>;
  let apiService: ApiServiceService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorsComponent],
      imports: [HttpClientTestingModule],
      providers: [HttpClient, HttpHandler, ApiServiceService]
    });
    fixture = TestBed.createComponent(VendorsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch vendor data on init', () => {
    const mockData : users[] = [
      {
        userName: 'Vendor1',
        email: 'vendor001@gmail.com',
        password: 'Vendor001!',
        contact: '98765000987',
        role: 'vendor'
      },
      {
        userName: 'Vendor02',
        email: 'vendor002@gmail.com',
        password: 'Vendor0013!',
        contact: '9807654034',
        role: 'vendor'
      }
    ];
    //when the fetchVendorData method is called, instead of making an actual HTTP request, 
    //it will return a mock observable that emits the mockData array.
    spyOn(apiService, 'fetchVendorData').and.returnValue(of(mockData));

    //call the ngOnInit method of the component and detect changes on the fixture. 
    //This will trigger the fetchVendorData method to be called and the vendorsDisplayed property 
    //of the component to be set based on the mock data.
    component.ngOnInit();
    fixture.detectChanges();

    //verify that the apiService.fetchVendorData method has been called and that the vendorsDisplayed 
    //data property of the component has been set to the mockData array.
    expect(apiService.fetchVendorData).toHaveBeenCalled();
    expect(component.vendorsDisplayed.data).toEqual(mockData);
  });
});
