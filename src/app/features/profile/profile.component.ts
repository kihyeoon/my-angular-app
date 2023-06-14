import { UntypedFormGroup, FormBuilder } from '@angular/forms';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder
  ) {}

  currentUser$!: User;

  profileForm: UntypedFormGroup = this.formBuilder.group({
    username: '',
  });

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: (user) => {
        if (!user) return;
        this.profileForm.patchValue({ username: user.username });
        this.currentUser$ = user;
      },
    });
  }

  logout(): void {
    this.userService.logout();
  }

  delete(): void {
    if (confirm('정말 탈퇴하시겠습니까?')) {
      this.userService.delete().subscribe();
    }
  }

  update(): void {
    const username = this.profileForm.value.username;
    this.userService.update({ ...this.currentUser$, username }).subscribe();
  }
}
