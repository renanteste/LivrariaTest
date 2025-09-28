import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from './models/user.dto';
import { CreateUserDto } from './models/create-user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Ajuste se preferir https://localhost:7136 (se seu backend aceitar CORS e certificado)
  private baseUrl = 'http://localhost:5005'; // backend rodando no seu .NET (conforme log)

  constructor(private http: HttpClient) { }

  listUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.baseUrl}/users`);
  }

  getUserById(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/users/${id}`);
  }

  createUser(dto: CreateUserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/users`, dto);
  }

  updateUser(id: string, dto: Partial<CreateUserDto>): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.baseUrl}/users/${id}`, dto);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, { email, password });
  }
}
