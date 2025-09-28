import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserDto } from '../models/user.dto';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: false
})
export class UserListComponent implements OnInit {
  users: UserDto[] = [];
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.userService.listUsers().subscribe({
      next: (data) => { this.users = data; this.loading = false; },
      error: (err) => { this.error = err?.message ?? 'Erro ao carregar'; this.loading = false; }
    });
  }

  onEdit(id: string): void {
    this.router.navigate(['/users/edit', id]);
  }

  onDelete(id: string): void {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
    this.userService.deleteUser(id).subscribe({
      next: () => this.load(),
      error: () => alert('Erro ao excluir usuário.')
    });
  }
}
