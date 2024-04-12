import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reporte } from '../interfaces/reportes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  //* Token Header
  tokenRequest(){
    const tokenLS = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'authorization' :`Bearer ${tokenLS}`
      }
    )
    console.log(headers);
    
    return headers;
  }
  //* API tabla de reportes
  private apiUrl : string = "https://6601ae619d7276a75551f43b.mockapi.io/"
  private apiReportes : string = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  private getReportesRequest(url:string): Observable<any>{
    let headers =  this.tokenRequest();
    return this.http.get<any>(url, {headers: headers});
  }
    // Peticion a API
  public getReportesTableData(): Observable<Reporte[]>{
    const url= `${this.apiReportes}/api/SEF/obtener`
    return this.getReportesRequest(url);
  }

  postData(data: any): Observable<any> {
    let headers =  this.tokenRequest();
    return this.http.post<any>(`${this.apiReportes}/api/SEF/generar`, data, {headers: headers});
  }

  getReporteDiarioTableData(data: any): Observable<any>{    
    let headers =  this.tokenRequest();
    return this.http.post<any>(`${this.apiReportes}/api/SEF/obtenerDiario`, data, {headers: headers})
  }
}
