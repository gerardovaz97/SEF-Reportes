import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreedentialsService {

    // API creedentials
    private apiUrl: string = "https://6601aee29d7276a75551f4ed.mockapi.io/";


    constructor(private http: HttpClient) { }

    private getUsersRequest(url: string): Observable<User>{
        return this.http.get<User>(url);
    }

    // Peticion a API
    public getUserCredentials(): Observable<User> {
        const url = `${this.apiUrl}/api/users/credenciales/1`;
        return this.getUsersRequest(url);
    }
    
}