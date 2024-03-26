import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reporte } from '../interfaces/reportes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
   
  // API tabla de reportes
  private apiUrl : string = "https://6601ae619d7276a75551f43b.mockapi.io/"

  constructor(private http: HttpClient) { }

  private getReportesRequest(url:string): Observable<Reporte>{
    return this.http.get<Reporte>(url);
  }
    // Peticion a API
  public getReportesTableData(): Observable<Reporte>{
    const url= `${this.apiUrl}/api/reportes/table`
    return this.getReportesRequest(url);
  }
}
