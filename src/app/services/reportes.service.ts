import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reporte } from '../interfaces/reportes.interfaces';
import { environment } from '../../environments/environment';

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
    return headers;
  }
  //* API tabla de reportes
  private apiReportes : string | undefined;

  constructor(private http: HttpClient) { 
    this.apiReportes = environment.apiUrl;
  }

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
