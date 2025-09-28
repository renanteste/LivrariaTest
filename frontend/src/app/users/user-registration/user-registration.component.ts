import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, CreateUserRequest } from '../../services/users.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  standalone: false
})
export class UserRegistrationComponent {
  user: CreateUserRequest = {
    nome: '',
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(
    private usersService: UsersService,
    public router: Router
  ) {}

  onSubmit(): void {
    if (this.user.nome && this.user.email && this.user.password) {
      this.usersService.createUser(this.user).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.errorMessage = 'Erro ao cadastrar usuário. Tente novamente.';
          console.error('Registration error:', error);
        }
      });
    }
  }
}
