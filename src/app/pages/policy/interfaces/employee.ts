export interface Employee {
  Meta: Meta;
  Data: Data;
}

export interface Data {
  Empleados: Empleado[];
}

export interface Empleado {
  idEmpleado: number;
  nombre: string;
  apellido: string;
  puesto: string;
}

export interface Meta {
  Status: string;
}
