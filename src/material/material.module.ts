import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule

  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule

  ]

})
export class MaterialModule { }
