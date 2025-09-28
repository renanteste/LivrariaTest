import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { CreateUserDto } from '../models/create-user.dto';
import { UserDto } from '../models/user.dto';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: false
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  userId?: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.userId = id;
        // buscar dados do usuário para preencher o form
        this.userService.getUserById(id).subscribe((u: UserDto) => {
          this.form.patchValue({ nome: u.nome, email: u.email });
          // em edição, não exigir senha
          this.form.get('password')?.clearValidators();
          this.form.get('password')?.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const dto: CreateUserDto = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      password: this.form.value.password
    };

    if (this.isEditMode && this.userId) {
      this.userService.updateUser(this.userId, dto).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.createUser(dto).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
