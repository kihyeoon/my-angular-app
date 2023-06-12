import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser$ = inject(UserService).currentUser;
  ngOnInit(): void {
    this.userService.login('kion1113@gmail.com').subscribe((data) => {
      console.log('data', data);
    });
  }

  constructor(private readonly userService: UserService) {}
}
