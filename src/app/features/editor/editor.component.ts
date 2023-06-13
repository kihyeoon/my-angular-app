import { ArticleService } from 'src/app/core/services/article.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/core/models/article.model';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  isSubmitting = false;
  isModifing = false;
  article!: Article;
  articleForm: UntypedFormGroup = this.formBuilder.group({
    title: '',
    body: '',
  });
  writer!: Omit<User, 'email'>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly articleService: ArticleService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const articleIdFromRoute = routeParams.get('id') || '';

    if (articleIdFromRoute) {
      this.articleService.get(articleIdFromRoute).subscribe({
        next: (article) => {
          this.articleForm.patchValue(article);
          this.article = article;
        },
      });

      this.isModifing = true;
    }

    this.userService.currentUser.subscribe((user) => {
      if (user) this.writer = { id: user.id, username: user.username };
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const formValue = this.articleForm.value;
    formValue.createdAt = this.isModifing
      ? this.article.createdAt
      : (formValue.createdAt = new Date().toISOString());

    this.isModifing
      ? this.articleService.update(this.article.id, formValue).subscribe({
          next: () => {
            this.isSubmitting = false;
            this.articleForm.reset();
          },
          error: (err) => {
            console.error(err);
            this.isSubmitting = false;
          },
        })
      : this.articleService
          .create({ ...formValue, writer: this.writer })
          .subscribe({
            next: () => {
              this.isSubmitting = false;
              this.articleForm.reset();
            },
            error: (err) => {
              console.error(err);
              this.isSubmitting = false;
            },
          });
    this.router.navigate(['/']);
  }
}
