import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private service: PolicyService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  delete() {
    this.service.deletePolicy(this.data.idPoliza).subscribe({
      next: () => {
        this.snackbar.open('Se ha eliminado correctamente la póliza');
        this.dialogRef.close({
          data: true,
        });
      },
      error: (err) => {
        this.snackbar.open(err.error.Data.Mensaje);
      },
    });
  }
}
