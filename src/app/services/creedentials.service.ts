import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreedentialsService {

    // API creedentials
    private apiUrl: string = "https://6601aee29d7276a75551f4ed.mockapi.io/";
    private userUrl: string = "http://localhost:8080"

    constructor(private http: HttpClient) { }

    private getUsersRequest(url: string): Observable<User[]>{
        return this.http.get<User[]>(url);
    }

    // Peticion a API
    public getUserCredentials(): Observable<User[]> {
        const url = `${this.apiUrl}/api/users/credenciales`;
        return this.getUsersRequest(url);
    }

    public getUsers2Request(): Observable<any>{
        return this.http.get<any>(`${this.userUrl}/api/SEF/usuarios`)
    }
    
}