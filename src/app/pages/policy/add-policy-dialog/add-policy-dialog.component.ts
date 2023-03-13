import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';
import { Empleado } from '../interfaces/employee';
import { Inventario } from '../interfaces/inventory';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-add-policy-dialog',
  templateUrl: './add-policy-dialog.component.html',
  styleUrls: ['./add-policy-dialog.component.scss'],
})
export class AddPolicyDialogComponent implements OnInit {
  searchEmpCtrl = new FormControl(null, Validators.required);
  employees: Empleado[] = [];
  filteredOptions!: Observable<Empleado[]>;
  inventory!: Inventario[];

  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: PolicyService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<AddPolicyDialogComponent>
  ) {}

  ngOnInit() {
    this.getEmployees();
    this.getInventory();
    this.buildForm();

    if (this.data?.isEdit) {
      this.form.patchValue({
        ...this.data.employee,
        sku: this.data.employee.articulo.sku,
      });
      this.searchEmpCtrl.setValue(this.data.employee.empleado);
    }
  }

  private _filter(value: string): Empleado[] {
    const filterValue = (value as any)?.toLowerCase();
    console.log({ filterValue });

    return this.employees?.filter((option) =>
      option.nombre.toLowerCase().includes(filterValue)
    );
  }

  getEmployees() {
    this.service.getEmployees().subscribe({
      next: (response) => {
        this.employees = response.Data.Empleados;
        this.filteredOptions = this.searchEmpCtrl.valueChanges.pipe(
          startWith(''),
          map((value) => {
            const name =
              typeof value === 'string' ? value : (value as any)?.name;
            return name ? this._filter(name as string) : this.employees.slice();
          })
        );
      },
    });
  }

  getInventory() {
    this.service.getInventory().subscribe({
      next: (response) => {
        this.inventory = response.Data.Inventario;
      },
    });
  }

  displayFn(value: Empleado): string {
    if (!value) return '';

    return `${value?.nombre} ${value?.apellido} - ${value?.puesto}`;
  }

  buildForm() {
    this.form = this.fb.group({
      sku: new FormControl(null, Validators.required),
      cantidad: new FormControl(null, [Validators.required, Validators.min(0)]),
    });
  }

  addPolicy() {
    const body = {
      ...this.form.value,
      idEmpleado: (this.searchEmpCtrl?.value as any).idEmpleado,
    };
    const method = this.data?.isEdit ? 'editPolicy' : 'savePolicy';
    this.service[method](body, this.data?.employee?.idPoliza).subscribe({
      next: () => {
        this.snackbar.open('Se ha guardado correctamente la información');
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
