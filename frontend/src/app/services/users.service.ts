import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CreateUserRequest {
  nome: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  createdAt: string;
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
