import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UsersService, User } from '../../services/users.service';
import { of, throwError } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let usersService: jasmine.SpyObj<UsersService>;

  const mockUsers: User[] = [
    { id: 1, name: 'Usuário 1', email: 'usuario1@test.com' },
    { id: 2, name: 'Usuário 2', email: 'usuario2@test.com' }
  ];

  beforeEach(async () => {
    const usersServiceSpy = jasmine.createSpyObj('UsersService', ['getUsers']);

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy }
      ]
    }).compileComponents();

    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    usersService.getUsers.and.returnValue(of(mockUsers));

    fixture.detectChanges(); // ngOnInit é chamado aqui

    expect(component.users.length).toBe(2);
    expect(component.users).toEqual(mockUsers);
    expect(component.loading).toBeFalse();
  });

  it('should handle error when loading users', () => {
    usersService.getUsers.and.returnValue(throwError(() => new Error('Erro')));

    fixture.detectChanges();

    expect(component.errorMessage).toBe('Erro ao carregar usuários. Tente novamente.');
    expect(component.loading).toBeFalse();
    expect(component.users.length).toBe(0);
  });
});
