import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddPolicyDialogComponent } from './add-policy-dialog/add-policy-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Poliza } from './interfaces/policy';
import { PolicyService } from './policy.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {
  public dataSource = new MatTableDataSource<Poliza>();

  public displayedColumns = [
    'id_policy',
    'employee_name',
    'sku',
    'article_name',
    'quantity',
    'date',
    'actions',
  ];

  constructor(private service: PolicyService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPolicies();
  }

  getPolicies() {
    this.service.getPolicy().subscribe({
      next: (response) => {
        this.dataSource.data = response.Data.Polizas;
      },
    });
  }

  openDialog(isEdit = false, employee = null) {
    const ref = this.dialog.open(AddPolicyDialogComponent, {
      width: '400px',
      data: {
        isEdit,
        employee,
      },
    });

    ref.afterClosed().subscribe((result) => {
      if (result?.data) {
        this.getPolicies();
      }
    });
  }

  openDeleteDialog(element: any) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { ...element },
    });
    ref.afterClosed().subscribe((result) => {
      if (result?.data) {
        this.getPolicies();
      }
    });
  }
}
