import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    return this.userService.isAuthenticated.pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/');
          return false;
        }
        return true;
      })
    );
  }
}
