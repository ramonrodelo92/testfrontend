export interface Inventory {
  Meta: Meta;
  Data: Data;
}

export interface Data {
  Inventario: Inventario[];
}

export interface Inventario {
  sku: number;
  nombre: string;
  cantidad: number;
}

export interface Meta {
  Status: string;
}
