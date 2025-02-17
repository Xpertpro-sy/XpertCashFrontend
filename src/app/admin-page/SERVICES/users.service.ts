import { Injectable } from '@angular/core';
import { Users } from '../MODELS/utilisateur.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = "http://localhost:8080/api/auth";
  

  constructor(private http: HttpClient) {}

  //Inscription
    registerUser(user: Users): Observable<{ message?: string; error?: string }> {
      return this.http.post<{ message?: string; error?: string }>(`${this.apiUrl}/register`, user);
    }

  // Connexion
    loginUser(credentials: { email: string; password: string }): Observable<{ message?: string; token?: string; error?: string }> {
      return this.http.post<{ message?: string; token?: string; error?: string }>(`${this.apiUrl}/login`, credentials);
  }
  
}
