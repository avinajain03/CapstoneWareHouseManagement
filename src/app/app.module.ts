import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from 'src/components/components.module';
import { HttpClientModule } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { MaterialModule } from 'src/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    CardModule,
    NgChartsModule,
    RouterModule,
    
   
   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
