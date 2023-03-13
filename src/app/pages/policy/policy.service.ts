import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './interfaces/employee';
import { Inventory } from './interfaces/inventory';
import { Policy } from './interfaces/policy';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getPolicy(): Observable<Policy> {
    return this.http.get<Policy>(`${this.apiUrl}/api/v1/poliza`);
  }

  getEmployees(): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/api/v1/empleado`);
  }

  getInventory(): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/api/v1/inventario`);
  }

  savePolicy(body: any) {
    return this.http.post(`${this.apiUrl}/api/v1/poliza`, body);
  }

  editPolicy(body: any, polizaId: number) {
    return this.http.put(`${this.apiUrl}/api/v1/poliza/${polizaId}`, body);
  }

  deletePolicy(polizaId: number) {
    return this.http.delete(`${this.apiUrl}/api/v1/poliza/${polizaId}`);
  }
}
