import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { AddPolicyDialogComponent } from './add-policy-dialog/add-policy-dialog.component';
import { PolicyListComponent } from './policy-list/policy-list.component';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyComponent } from './policy.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [PolicyComponent, PolicyListComponent, AddPolicyDialogComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    PolicyRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule
  ],
})
export class PolicyModule {}
