import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors } from 'src/app/core/models/errors.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private FormBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}
  authType = '';
  title = '';
  errors: Errors = { errors: {} };
  isSubmitting = false;
  authForm: UntypedFormGroup = this.FormBuilder.group({
    email: ['', [Validators.required], { nonNullable: true }],
  });

  ngOnInit(): void {
    this.authType = this.route.snapshot.url.at(-1)!.path;
    this.title = this.authType === 'login' ? '로그인' : '회원가입';
    if (this.authType === 'register') {
      this.authForm.addControl(
        'username',
        new FormControl('', {
          validators: [Validators.required, Validators.minLength(2)],
          nonNullable: true,
        })
      );
    }
  }

  submitForm(): void {
    this.isSubmitting = true;
    this.errors = { errors: {} };

    let observable =
      this.authType === 'login'
        ? this.userService.login(this.authForm.value.email as string)
        : this.userService.register(
            this.authForm.value as {
              email: string;
              username: string;
            }
          );

    observable.subscribe({
      next: () => void this.router.navigate(['/']),
      error: (err) => {
        this.errors = err;
        this.isSubmitting = false;
      },
    });
  }
}
