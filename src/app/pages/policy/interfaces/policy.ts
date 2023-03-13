export interface Policy {
  Meta: Meta;
  Data: Data;
}

export interface Data {
  Polizas: Poliza[];
}

export interface Poliza {
  idPoliza: number;
  empleado: Empleado;
  articulo: Articulo;
  cantidad: number;
  fecha: Date;
}

export interface Articulo {
  sku: number;
  nombre: string;
  cantidad: number;
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
