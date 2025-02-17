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

  /**
   * Envoie les données d'inscription à l'API et retourne une réponse typée
   * @param user - Données de l'utilisateur à inscrire
   * @returns Observable avec la réponse du backend sous forme d'objet JSON
   */
  registerUser(user: Users): Observable<{ message?: string; error?: string }> {
    return this.http.post<{ message?: string; error?: string }>(`${this.apiUrl}/register`, user);
  }
}
