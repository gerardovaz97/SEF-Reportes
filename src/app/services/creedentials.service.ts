import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreedentialsService {

    // API creedentials
    private userUrl: string = "http://localhost:8080"

    constructor(private http: HttpClient) { }

    public postUserCredentials(user: any): Observable<any>{
        return this.http.post<any>(`${this.userUrl}/api/SEF/usuarios`, user);
    }
    
}