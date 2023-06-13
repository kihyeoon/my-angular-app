import { FormControl } from '@angular/forms';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private readonly userService: UserService) {}

  currentUser$!: User;

  usernameControl = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: (user) => {
        if (!user) return;
        this.usernameControl.setValue(user.username);
        this.currentUser$ = user;
      },
    });
  }

  logout(): void {
    this.userService.logout();
  }

  delete(): void {
    this.userService.delete().subscribe();
  }

  update(): void {
    const username = this.usernameControl.value;
    this.userService.update({ ...this.currentUser$, username }).subscribe();
  }
}
