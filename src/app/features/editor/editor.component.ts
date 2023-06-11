import { ArticleService } from 'src/app/core/services/article.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/core/models/article.model';

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

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
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
      : this.articleService.create(formValue).subscribe({
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
