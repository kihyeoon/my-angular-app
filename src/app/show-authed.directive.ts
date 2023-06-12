import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Directive({
  selector: '[appShowAuthed]',
})
export class ShowAuthedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {}

  condition: boolean = false;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe((isAuthenticated: boolean) => {
      (isAuthenticated && this.condition) ||
      (!isAuthenticated && !this.condition)
        ? this.viewContainer.createEmbeddedView(this.templateRef)
        : this.viewContainer.clear();
    });
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }
}
