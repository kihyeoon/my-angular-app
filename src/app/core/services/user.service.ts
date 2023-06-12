import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { tokenService } from 'src/app/core/services/token.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: tokenService,
    private readonly router: Router
  ) {}

  setAuth(user: User): void {
    this.tokenService.saveToken(user.id.toString());
    this.currentUserSubject.next(user);
  }

  purgeAuth(): void {
    this.tokenService.destroyToken();
    this.currentUserSubject.next(null);
  }

  login(email: string): Observable<User> {
    console.log('login');
    return this.http.get<User[]>(`/users?email=${email}`).pipe(
      map((users) => users[0]),
      tap((user) => console.log('user', user)),
      tap((user) => this.setAuth(user))
    );
  }

  register(credentials: {
    username: string;
    email: string;
  }): Observable<{ user: User }> {
    return this.http
      .post<{ user: User }>('/users', { user: credentials })
      .pipe(tap(({ user }) => this.setAuth(user)));
  }

  logout(): void {
    this.purgeAuth();
    void this.router.navigate(['/']);
  }

  getCurrentUser(): Observable<{ user: User }> {
    const token = this.tokenService.getToken();
    return this.http.get<{ user: User }>(`/users/${token}`).pipe(
      tap({
        next: ({ user }) => this.setAuth(user),
        error: () => this.purgeAuth(),
      })
    );
  }

  update(user: Partial<User>): Observable<{ user: User }> {
    const token = this.tokenService.getToken();
    return this.http.put<{ user: User }>(`/user${token}`, { user }).pipe(
      tap(({ user }) => {
        this.currentUserSubject.next(user);
      })
    );
  }

  delete(): Observable<{}> {
    const token = this.tokenService.getToken();
    return this.http.delete(`/user${token}`).pipe(
      tap(() => {
        this.logout();
      })
    );
  }
}
