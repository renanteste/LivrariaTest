import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRegistrationComponent } from './user-registration.component';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let usersService: jasmine.SpyObj<UsersService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const usersServiceSpy = jasmine.createSpyObj('UsersService', ['createUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [UserRegistrationComponent],
      imports: [FormsModule],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form with valid data', () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@test.com' };
    usersService.createUser.and.returnValue(of(mockUser));

    component.user = { name: 'Test User', email: 'test@test.com', password: 'password' };
    component.onSubmit();

    expect(usersService.createUser).toHaveBeenCalledWith(component.user);
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should handle error on submit', () => {
    usersService.createUser.and.returnValue(throwError(() => new Error('Error')));

    component.user = { name: 'Test User', email: 'test@test.com', password: 'password' };
    component.onSubmit();

    expect(component.errorMessage).toBe('Erro ao cadastrar usuário. Tente novamente.');
  });
});
