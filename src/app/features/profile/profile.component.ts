import { UserService } from './../../core/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(private readonly userService: UserService) {}

  logout(): void {
    this.userService.logout();
  }
}
