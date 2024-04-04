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
  private apiReportes : string = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  private getReportesRequest(url:string): Observable<Reporte[]>{
    return this.http.get<Reporte[]>(url);
  }
    // Peticion a API
  public getReportesTableData(): Observable<Reporte[]>{
    const url= `${this.apiReportes}/api/SEF/obtener`
    return this.getReportesRequest(url);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiReportes}/api/SEF/generar`, data);
  }

  getReporteDiarioTableData(data: any): Observable<any>{
    console.log(data);
    
    return this.http.post<any>(`${this.apiReportes}/api/SEF/obtenerDiario`, data)
  }
}
