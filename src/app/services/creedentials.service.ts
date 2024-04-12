import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CreedentialsService {

    //! API creedentials
    private userUrl: string = "http://localhost:8080"

    constructor(private http: HttpClient, private router: Router) { }

    //! Metodo POST de las credenciales
    public postUserCredentials(user: any): Observable<any>{
        return this.http.post<any>(`${this.userUrl}/api/SEF/usuarios`, user);
    }

    //! Almacenando Token en el LocalStorage
    public saveToken(token:any): void{
        localStorage.removeItem('token');
        localStorage.setItem('token', token);
    }
    //! Eliminacion de Token al Logout
    public LogoutUser(message:string = "Se ha cerrado la sesión"): void{
        localStorage.removeItem('token');
        this.router.navigate(['login']);
        alert(message);
    }

    // //! Comporbación de Token
    public jwtHelperService = new JwtHelperService();
    public TokenValid(): void{
        const jwt = localStorage.getItem('token');
        if(this.jwtHelperService.isTokenExpired(jwt)){
            this.LogoutUser();
        }
        else{
            return;
        }
    }
}