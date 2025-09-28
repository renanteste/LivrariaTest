import { Component, OnInit } from '@angular/core';
import { UsersService, User } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: false
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar usuários. Tente novamente.';
        this.loading = false;
        console.error('Error loading users:', error);
      }
    });
  }
}
