import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Interface para criação de usuário (com senha)
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

// Interface para usuário retornado da API (sem senha)
export interface User {
  id?: number;
  name: string;
  email: string;
  // password não está aqui porque a API não retorna a senha
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  createUser(user: CreateUserRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }
}
